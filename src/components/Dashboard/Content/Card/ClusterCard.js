import React from 'react';
import { Card, Icon } from 'antd';

const { Meta } = Card;

const ClusterCard = ({ ip }) => {
  return (
    <Card
      style={{ width: 400 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <Icon type="setting" key="setting" />,
        <Icon type="delete" key="ellipsis" />,
      ]}
    >
      <Meta title={ip} description="This is the description." />
    </Card>
  );
};

export default ClusterCard;
