import React, { Component } from 'react';
import axios from 'axios';
import { Table, Tag, Button, message } from 'antd';

import { withFirebase } from '@firebase-api';

const { Column } = Table;

class Deployments extends Component {
  state = { deployments: [], loading: false };

  async componentDidMount() {
    const { firebase, cid } = this.props;

    try {
      const token = await firebase.auth.currentUser.getIdToken(true);
      const uid = firebase.auth.currentUser.uid;

      this.setState({ loading: true });

      const response = await axios.get(
        `https://us-central1-kubeko.cloudfunctions.net/proxy/clusters/${cid}/apis/apps/v1/namespaces/${uid.toLowerCase()}/deployments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const items = response.data.items;

      const deployments = [];
      for (const deployment of items) {
        const {
          metadata: { name = '' },
          spec: {
            template: {
              metadata: { labels = {} },
              spec: { containers = [] }
            }
          },
          status: {
            replicas = 0,
            conditions: [{ type = '' }]
          }
        } = deployment;

        deployments.push({
          key: name,
          name,
          labels,
          containers,
          replicas,
          type
        });
      }
      this.setState({ deployments });
    } catch (error) {
      message.error(`Failed to retrieve deployments for ${cid}`);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { deployments, loading } = this.state;
    return (
      <Table
        loading={loading}
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
  }
}

export default withFirebase(Deployments);