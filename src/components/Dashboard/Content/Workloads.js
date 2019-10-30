import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Table, Tag, message } from 'antd';
import Clusters from '../Lists/Clusters';
import { withFirebase } from '@firebase-api';

import styles from './Workloads.module.scss';

const { Column } = Table;

class Workload extends Component {
  state = { clusters: [] };

  async componentDidMount() {
    const token = await this.props.firebase.auth.currentUser.getIdToken(true);

    try {
      const response = await axios.get(
        'https://us-central1-kubeko.cloudfunctions.net/api/workloads',
        {
          headers: {
            Accept: 'application/json;odata=verbose',
            Authorization: `Bearer ${token}`
          }
        }
      );

      this.setState({ clusters: response.data });
    } catch (error) {
      message.error(error.message, 3);
    }
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
              tableLayout="fixed"
              size="middle"
              title={() => <strong>Deployments</strong>}
              dataSource={deployments}
              pagination={false}
            >
              <Column title="Name" dataIndex="name" />
              <Column title="Pods" dataIndex="replicas" />
              <Column
                title="Status"
                dataIndex="type"
                render={type => {
                  const color = type === 'Available' ? 'green' : 'orange';
                  return <Tag color={color}>{type}</Tag>;
                }}
              />
              <Column
                title="Images"
                dataIndex="containers"
                render={containers =>
                  containers.map(container => (
                    <Tag key={container.image} color="blue">
                      {container.image}
                    </Tag>
                  ))
                }
              />
              <Column
                title="Labels"
                dataIndex="labels"
                render={labels =>
                  Object.keys(labels).map(key => (
                    <Tag key={key} color="purple">
                      {key}: {labels[key]}
                    </Tag>
                  ))
                }
              />
            </Table>
          );
          const servicesTable = (
            <Table
              tableLayout="fixed"
              size="middle"
              title={() => <strong>Services</strong>}
              dataSource={services}
              pagination={false}
            >
              <Column title="Name" dataIndex="name" />
              <Column title="Type" dataIndex="type" />
              <Column title="ClusterIP" dataIndex="clusterIP" />
              <Column
                title="Ports"
                dataIndex="ports"
                render={ports =>
                  ports.map(port => (
                    <Tag key={port.name + port.port} color="magenta">
                      {port.port}:{port.targetPort}
                    </Tag>
                  ))
                }
              />
              <Column
                title="Selector"
                dataIndex="selector"
                render={selector =>
                  Object.keys(selector).map(key => (
                    <Tag key={key} color="blue">
                      {key}: {selector[key]}
                    </Tag>
                  ))
                }
              />
              <Column
                title="Labels"
                dataIndex="labels"
                render={labels =>
                  Object.keys(labels).map(key => (
                    <Tag key={key} color="purple">
                      {key}: {labels[key]}
                    </Tag>
                  ))
                }
              />
            </Table>
          );
          return (
            <Fragment key={cluster.key}>
              <h2 style={{ margin: '0', fontFamily: 'Ubuntu' }}>
                Cluster: {cluster.addr}
              </h2>
              {deploymentsTable}
              {servicesTable}
            </Fragment>
          );
        })
      );

    return (
      <div className={styles.container}>
        {clusterTables}
        <Clusters />
      </div>
    );
  }
}

export default withFirebase(Workload);
