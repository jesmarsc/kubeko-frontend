import React, { Component } from 'react';
import axios from 'axios';
import { Table, Tag, Button, message } from 'antd';

import { withFirebase } from '@firebase-api';

const { Column } = Table;

class Services extends Component {
  state = { services: [], loading: false };

  async componentDidMount() {
    const { firebase, cid } = this.props;

    try {
      const token = await firebase.auth.currentUser.getIdToken(true);
      const uid = firebase.auth.currentUser.uid;
      this.setState({ loading: true });
      const response = await axios.get(
        `https://us-central1-kubeko.cloudfunctions.net/proxy/clusters/${cid}/api/v1/namespaces/${uid.toLowerCase()}/services`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const items = response.data.items;
      const services = [];
      for (const service of items) {
        const {
          metadata: { name = '', labels = {} },
          spec: { ports = [], selector = {}, clusterIP = '', type = '' }
        } = service;
        services.push({
          key: name,
          name,
          labels,
          ports,
          selector,
          clusterIP,
          type
        });
      }
      this.setState({ services });
    } catch (error) {
      message.error(`Failed to retrieve services for ${cid}`);
    } finally {
      this.setState({ loading: false });
    }
  }

  deleteServiceHandler = async serviceIndex => {
    try {
      const { services } = this.state;
      const { firebase, cid } = this.props;
      const token = await firebase.auth.currentUser.getIdToken(true);
      const uid = firebase.auth.currentUser.uid;
      const name = services[serviceIndex].name;

      this.setState({ loading: true });

      await axios.delete(
        `https://us-central1-kubeko.cloudfunctions.net/proxy/clusters/${cid}/api/v1/namespaces/${uid.toLowerCase()}/services/${name}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      this.setState(prevState => {
        const services = [...prevState.services];
        services.splice(serviceIndex, 1);
        return { services };
      });

      message.success(`Successfully deleted ${name}`, 3);
    } catch (error) {
      message.error(error.message, 3);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { services, loading } = this.state;
    return (
      <Table
        loading={loading}
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
        <Column
          title="Actions"
          key="actions"
          render={(text, record, serviceIndex) => (
            <Button
              type="link"
              onClick={() => this.deleteServiceHandler(serviceIndex)}
            >
              Delete
            </Button>
          )}
        />
      </Table>
    );
  }
}

export default withFirebase(Services);
