import React, { Component } from 'react';
import { message } from 'antd';

import { k8sProxy } from '@src/App';
import WorkloadUpload from '../Forms/WorkloadUpload';
import AuthUserContext from '@session/AuthUserContext';
import { withFirebase } from '@firebase-api';
import Cluster from '../Lists/Cluster';

import styles from './Content.module.scss';

class Workload extends Component {
  static contextType = AuthUserContext;

  state = { clusters: {} };

  async componentDidMount() {
    try {
      const { firebase } = this.props;
      const { uid } = this.context;

      await this.getClusters();
      firebase
        .user(uid)
        .child('deployments')
        .on('child_removed', data => {
          this.setState(prevState => {
            const { [data.key]: removed, ...clusters } = prevState.clusters;
            return { clusters };
          });
        });
    } catch (error) {
      message.error(error.message, 3);
    }
  }

  componentWillUnmount() {
    const uid = this.context.uid;
    this.props.firebase
      .user(uid)
      .child('deployments')
      .off();
  }

  getClusters = async () => {
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

      const lowerCaseUid = uid.toLowerCase();
      await k8sProxy.delete(
        `/clusters/${cid}/api/v1/namespaces/${lowerCaseUid}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updates = {};
      updates[`/clusters-users/${cid}/${uid}`] = null;
      updates[`/users/${uid}/deployments/${cid}`] = null;
      firebase.db.ref().update(updates);

      message.success(`Successfully left cluster ${cid}`, 3);
    } catch (error) {
      message.error(error.message, 3);
      throw error;
    }
  };

  render() {
    const { clusters } = this.state;
    const cids = Object.keys(clusters);

    const tables = cids.map(cid => (
      <Cluster
        key={cid}
        cid={cid}
        deleteNamespace={this.deleteNamespaceHandler}
      />
    ));

    return (
      <div className={styles.container}>
        {tables}
        <WorkloadUpload refresh={this.getClusters} />
      </div>
    );
  }
}

export default withFirebase(Workload);
