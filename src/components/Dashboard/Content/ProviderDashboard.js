import React, {
  useCallback,
  useEffect,
  useContext,
  useReducer,
  useMemo,
  Fragment
} from 'react';
import { withFirebase } from '@firebase-api';
import AuthUserContext from '@session/AuthUserContext';
import { Table, Button } from 'antd';
import styles from './Content.module.scss';

const columns = [
  {
    title: 'Users',
    dataIndex: 'uid'
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (text, record) => (
      <Button type="link" onClick={record.removeUser}>
        Kick User
      </Button>
    )
  }
];

const clustersReducer = (clusters, action) => {
  switch (action.type) {
    case 'SET':
      return action.clusters;
    case 'ADD':
      return { ...clusters, [action.cid]: true };
    case 'DELETE':
      const { [action.cid]: removed, ...rest } = clusters;
      return rest;
    case 'DELETE_USER':
      const copy = { ...clusters };
      const users = [...clusters[action.cid]];
      users.splice(action.index, 1);
      copy[action.cid] = users;
      return copy;

    default:
      throw new Error('Invalid action.type');
  }
};

const requestReducer = (state, action) => {
  switch (action.type) {
    case 'REQUEST':
      return { error: null, isLoading: true };
    case 'RESPONSE':
      return { error: null, isLoading: false };
    case 'ERROR':
      return { error: action.error, isLoading: false };
    default:
      throw new Error('Invalid action.type');
  }
};

const ProviderDashboard = React.memo(({ firebase }) => {
  const { uid } = useContext(AuthUserContext);

  const [clusters, clustersDispatch] = useReducer(clustersReducer, {});

  // eslint-disable-next-line
  const [request, requestDispatch] = useReducer(requestReducer, {
    error: null,
    isLoading: false
  });

  const getUsersInCluster = useCallback(
    cid => {
      return firebase.db
        .ref('clusters-users')
        .child(cid)
        .once('value')
        .then(snapshot => {
          return { ...snapshot.val() };
        });
    },
    [firebase]
  );

  const removeUser = useCallback(
    async (cid, uid, index) => {
      try {
        requestDispatch({ type: 'REQUEST' });
        const updates = {
          [`users/${uid}/deployments/${cid}`]: null,
          [`clusters-users/${cid}/${uid}`]: null
        };

        await firebase.db.ref().update(updates);
        clustersDispatch({ type: 'DELETE_USER', cid, index });
      } catch (error) {
        console.log(error);
        requestDispatch({ type: 'ERROR', error });
      }
    },
    [firebase]
  );

  const getClusters = useCallback(async () => {
    try {
      requestDispatch({ type: 'REQUEST' });
      const snapshot = await firebase
        .user(uid)
        .child('clusters')
        .once('value');

      const clusters = { ...snapshot.val() };

      const getUsersRequests = [];
      for (const cid of Object.keys(clusters)) {
        getUsersRequests.push(
          getUsersInCluster(cid).then(users => {
            clusters[cid] = Object.keys(users).map((uid, index) => ({
              key: uid,
              uid,
              removeUser: () => removeUser(cid, uid, index)
            }));
          })
        );
      }

      await Promise.all(getUsersRequests);

      requestDispatch({ type: 'RESPONSE' });
      clustersDispatch({ type: 'SET', clusters });
    } catch (error) {
      requestDispatch({ type: 'ERROR', error });
    }
  }, [uid, firebase, getUsersInCluster, removeUser]);

  useEffect(() => {
    getClusters();
  }, [getClusters]);

  const clusterTables = useMemo(() => {
    return Object.keys(clusters).map(cid => {
      return (
        <Fragment key={cid}>
          <h2>
            <strong>Cluster: {cid}</strong>
          </h2>
          <Table
            locale={{ emptyText: 'No Users' }}
            size="middle"
            columns={columns}
            dataSource={clusters[cid]}
          />
        </Fragment>
      );
    });
  }, [clusters]);

  return (
    <Fragment>
      <div className={styles.container}>{clusterTables}</div>
    </Fragment>
  );
});

export default withFirebase(ProviderDashboard);
