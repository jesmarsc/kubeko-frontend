import React, { Component } from 'react';
import { Button, message } from 'antd';

import { k8sProxy } from '@src/App';
import Clusters from '../Lists/Clusters';
import AuthUserContext from '@session/AuthUserContext';
import { withFirebase } from '@firebase-api';
import Deployments from '../Lists/Deployments';
import Services from '../Lists/Services';

import styles from './Workloads.module.scss';

class Workload extends Component {
  static contextType = AuthUserContext;

  state = { clusters: {}, loading: false };

  async componentDidMount() {
    try {
      this.fetchClusters();
    } catch (error) {
      message.error(error.message, 3);
    }
  }

  fetchClusters = async () => {
    const { firebase } = this.props;
    const { uid } = this.context;
    const snapshot = await firebase
      .user(uid)
      .child('deployments')
      .once('value');
    const clusters = { ...snapshot.val() };
    this.setState({ clusters });
  };

  deleteNamespaceHandler = async cid => {
    try {
      const { firebase } = this.props;
      const { uid } = this.context;
      const token = await this.context.getIdToken(true);

      this.setState({ loading: true });
      const lowerCaseUid = uid.toLowerCase();
      await k8sProxy.delete(
        `/clusters/${cid}/api/v1/namespaces/${lowerCaseUid}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updates = {};
      updates[`/clusters-users/${cid}/${uid}`] = null;
      updates[`/users/${uid}/deployments/${cid}`] = null;
      firebase.db.ref().update(updates);

      this.fetchClusters();

      message.success(`Successfully left cluster ${cid}`, 3);
    } catch (error) {
      message.error(error.message, 3);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { clusters, loading } = this.state;
    const cids = Object.keys(clusters);

    const tables = cids.map(cid => {
      return (
        <div className={styles.cluster} key={cid}>
          <span className={styles.header}>
            <strong>Cluster: {cid}</strong>
          </span>
          <Button
            loading={loading}
            onClick={() => this.deleteNamespaceHandler(cid)}
            type="link"
          >
            Leave cluster
          </Button>
          <Deployments cid={cid} />
          <Services cid={cid} />
        </div>
      );
    });

    return (
      <div className={styles.container}>
        {tables}
        <Clusters />
      </div>
    );
  }
}

export default withFirebase(Workload);
