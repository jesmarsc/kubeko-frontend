import React, { Component, Fragment } from 'react';
import { message } from 'antd';
import Clusters from '../Lists/Clusters';
import { withFirebase } from '@firebase-api';
import Deployments from '../Lists/Deployments';
import Services from '../Lists/Services';

import styles from './Workloads.module.scss';

class Workload extends Component {
  state = { clusters: {} };

  async componentDidMount() {
    try {
      const { firebase } = this.props;
      const uid = firebase.auth.currentUser.uid;
      const snapshot = await firebase
        .user(uid)
        .child('deployments')
        .once('value');
      this.setState({ clusters: snapshot.val() });
    } catch (error) {
      message.error(error.message, 3);
    }
  }

  render() {
    const { clusters } = this.state;
    const cids = Object.keys(clusters);

    const tables = cids.map(cid => {
      return (
        <Fragment key={cid}>
          <h2>Cluster: {cid}</h2>
          <Deployments cid={cid} />
          <Services cid={cid} />
        </Fragment>
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
