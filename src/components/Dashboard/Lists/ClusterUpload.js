import React from 'react';
import { Collapse, Icon } from 'antd';

import ClusterForm from '../Forms/ClusterForm';

const { Panel } = Collapse;

const ClusterUpload = () => {
  const customPanel = {
    background: '#fafafa',
    border: 0,
    borderRadius: 16,
    marginTop: 32,
    padding: 0
  };
  return (
    <Collapse
      bordered={false}
      expandIcon={({ isActive }) =>
        isActive ? (
          <Icon type="minus-square" theme="filled" />
        ) : (
          <Icon type="plus-square" theme="filled" />
        )
      }
    >
      <Panel header="New Cluster" key="1" style={customPanel}>
        <ClusterForm />
      </Panel>
    </Collapse>
  );
};

export default ClusterUpload;
