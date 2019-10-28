import React, { Component } from 'react';
import { Table } from 'antd';
import { withFirebase } from '@firebase-api';
import UploadForm from '../Forms/UploadForm';

const { Column } = Table;

class Clusters extends Component {
  state = {
    clusters: [],
    selectedRowKeys: [],
    loading: true
  };

  selectRow = record => {
    this.setState({ selectedRowKeys: [record.key] });
  };

  onSelectedRowKeysChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  componentDidMount() {
    this.props.firebase
      .clusters()
      .once('value')
      .then(snapshot => {
        const value = snapshot.val();
        if (!value) return;
        const clusters = Object.keys(value).map(key => {
          const { addr, owner } = value[key];
          return { key, addr, owner };
        });

        this.setState({ clusters, loading: false });
      });
  }

  render() {
    const { clusters, selectedRowKeys, loading } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
      type: 'radio'
    };
    return (
      <Table
        size="small"
        loading={loading}
        bordered
        rowSelection={rowSelection}
        dataSource={clusters}
        onRow={record => ({ onClick: () => this.selectRow(record) })}
        title={() => (
          <span>
            <strong>New Deployment</strong>
          </span>
        )}
        footer={() => <UploadForm cid={selectedRowKeys[0]} />}
      >
        <Column title="Address" dataIndex="addr" />
        <Column title="Owner" dataIndex="owner" />
      </Table>
    );
  }
}

export default withFirebase(Clusters);
