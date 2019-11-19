import React, { useEffect, useContext, useReducer, useMemo } from 'react';
import { withFirebase } from '@firebase-api';

import UsersInCluster from '../Lists/UsersInCluster';
import AuthUserContext from '@session/AuthUserContext';
import styles from './Content.module.scss';
import ClusterUpload from '../Forms/ClusterUpload';

const clustersReducer = (clusters, action) => {
  switch (action.type) {
    case 'SET': {
      const clusters = action.clusters ? action.clusters : {};
      return Object.keys(clusters);
    }
    case 'ADD': {
      return [...clusters, action.cluster];
    }
    case 'DELETE': {
      return clusters.filter(cluster => cluster !== action.cluster);
    }
    default:
      throw new Error('Invalid action.type');
  }
};

const ProviderDashboard = React.memo(({ firebase }) => {
  const authUser = useContext(AuthUserContext);

  const [clusters, clustersDispatch] = useReducer(clustersReducer, []);

  useEffect(() => {
    const clustersRef = firebase.db.ref(`users/${authUser.uid}/clusters`);

    clustersRef.on('child_added', snapshot => {
      clustersDispatch({ type: 'ADD', cluster: snapshot.key });
    });

    clustersRef.on('child_removed', snapshot => {
      clustersDispatch({ type: 'DELETE', cluster: snapshot.key });
    });

    return () => {
      clustersRef.off();
    };
  }, [authUser, firebase]);

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
