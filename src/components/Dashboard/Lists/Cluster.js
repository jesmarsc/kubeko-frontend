import React, { PureComponent } from 'react';
import { Button } from 'antd';

import Deployments from './Deployments';
import Services from './Services';

class Cluster extends PureComponent {
  state = { deleting: false, refreshing: false };

  deleteNamespace = async () => {
    try {
      this.setState({ deleting: true });
      await this.props.deleteNamespace(this.props.cid);
    } catch (error) {
      this.setState({ deleting: false });
    }
  };

  refreshCluster = () => {
    this.setState(prevState => {
      return { refreshing: !prevState.refreshing };
    });
  };

  render() {
    const { deleting, refreshing } = this.state;
    const { cid } = this.props;
    return (
      <div style={{ marginBottom: '32px' }} key={cid}>
        <h2>
          <strong>Cluster: {cid}</strong>
        </h2>
        <Button onClick={this.refreshCluster} type="link" icon="sync">
          Refresh
        </Button>
        <Button
          onClick={this.deleteNamespace}
          loading={deleting}
          type="link"
          icon="delete"
        >
          Leave cluster
        </Button>
        <Deployments cid={cid} refresh={refreshing} />
        <Services cid={cid} refresh={refreshing} />
      </div>
    );
  }
}

export default Cluster;
