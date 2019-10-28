import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Table } from 'antd';
import Clusters from '../Lists/Clusters';
import { withFirebase } from '@firebase-api';

import styles from './Workloads.module.scss';

const { Column } = Table;

class Workload extends Component {
  state = { clusters: [] };

  async componentDidMount() {
    const token = await this.props.firebase.auth.currentUser.getIdToken(true);

    const response = await axios.get(
      'https://us-central1-kubeko.cloudfunctions.net/api/workloads',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    this.setState({ clusters: response.data });
  }

  render() {
    const { clusters } = this.state;
    const clusterTables =
      clusters.length === 0 ? (
        <Table
          title={() => <strong>Workloads</strong>}
          bordered
          loading
          dataSource={null}
          pagination={false}
        ></Table>
      ) : (
        clusters.map(cluster => {
          const { deployments, services } = cluster;
          const deploymentsTable = (
            <Table
              title={() => <strong>Deployments</strong>}
              dataSource={deployments}
              pagination={false}
            >
              <Column title="Name" dataIndex="name" />
              <Column title="Pods" dataIndex="replicas" />
            </Table>
          );
          const servicesTable = (
            <Table
              title={() => <strong>Services</strong>}
              dataSource={services}
              pagination={false}
            >
              <Column title="Name" dataIndex="name" />
              <Column title="ClusterIP" dataIndex="clusterIP" />
            </Table>
          );
          return (
            <Fragment>
              <h1 style={{ lineHeight: '1rem', fontFamily: 'Ubuntu' }}>
                Cluster: {cluster.addr}
              </h1>
              {deploymentsTable}
              {servicesTable}
            </Fragment>
          );
        })
      );

    return (
      <div className={styles.container}>
        <Clusters />
        {clusterTables}
      </div>
    );
  }
}

export default withFirebase(Workload);
