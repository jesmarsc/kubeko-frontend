import React, {
  useCallback,
  useEffect,
  useContext,
  useReducer,
  useMemo
} from 'react';
import { withFirebase } from '@firebase-api';

import UsersInCluster from '../Lists/UsersInCluster';
import AuthUserContext from '@session/AuthUserContext';
import styles from './Content.module.scss';
import ClusterUpload from '../Forms/ClusterUpload';

const clustersReducer = (clusters, action) => {
  switch (action.type) {
    case 'SET':
      const clusters = action.clusters ? action.clusters : {};
      return Object.keys(clusters);
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

  const [clusters, clustersDispatch] = useReducer(clustersReducer, []);

  // eslint-disable-next-line
  const [request, requestDispatch] = useReducer(requestReducer, {
    error: null,
    isLoading: false
  });

  const getClusters = useCallback(async () => {
    try {
      requestDispatch({ type: 'REQUEST' });
      const snapshot = await firebase
        .user(uid)
        .child('clusters')
        .once('value');

      requestDispatch({ type: 'RESPONSE' });
      clustersDispatch({ type: 'SET', clusters: snapshot.val() });
    } catch (error) {
      requestDispatch({ type: 'ERROR', error });
    }
  }, [uid, firebase]);

  useEffect(() => {
    getClusters();
  }, [getClusters]);

  const clusterTables = useMemo(() => {
    return clusters.map(cid => <UsersInCluster key={cid} cid={cid} />);
  }, [clusters]);

  return (
    <div className={styles.container}>
      {clusterTables}
      <ClusterUpload />
    </div>
  );
});

export default withFirebase(ProviderDashboard);
