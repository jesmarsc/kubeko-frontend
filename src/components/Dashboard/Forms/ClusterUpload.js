import React from 'react';
import { Collapse, Icon } from 'antd';

import ClusterForm from './ClusterForm';

const { Panel } = Collapse;

const ClusterUpload = () => {
  const customPanel = {
    background: '#fafafa',
    border: 0,
    borderRadius: 16,
    marginTop: 32,
    padding: 0,
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
        <p>Make sure to set the following flags on your API server:</p>
        <ul style={{ marginLeft: '32px' }}>
          <li>apiserver.authorization-mode=RBAC</li>
          <li>
            apiserver.oidc-issuer-url=https://securetoken.google.com/kubeko
          </li>
          <li>apiserver.oidc-client-id=kubeko</li>
          <li>apiserver.oidc-username-claim=email</li>
          <li>apiserver.oidc-groups-claim=groups</li>
          <li>apiserver.oidc-groups-prefix="oidc:"</li>
        </ul>
        <p>And give the cluster-admin role to our backend server:</p>
        <ul style={{ marginLeft: '32px' }}>
          <li>
            kubectl create clusterrolebinding kubeko-admin
            --clusterrole=cluster-admin --group="oidc:admin"
          </li>
        </ul>
      </Panel>
    </Collapse>
  );
};

export default ClusterUpload;
