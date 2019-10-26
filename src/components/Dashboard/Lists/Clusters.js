import React, { Component } from 'react';
import { Table } from 'antd';
import { withFirebase } from '@firebase-api';
import UploadForm from '../Forms/UploadForm';

const { Column } = Table;

class Clusters extends Component {
  state = {
    clusters: [],
    selectedRowKeys: []
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
        const clusters = Object.keys(value).map(key => {
          const { addr, owner } = value[key];
          return { key, addr, owner };
        });

        this.setState({ clusters });
      });
  }

  render() {
    const { clusters, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
      type: 'radio'
    };
    return (
      <Table
        style={{ padding: '16px' }}
        rowSelection={rowSelection}
        dataSource={clusters}
        onRow={record => ({ onClick: () => this.selectRow(record) })}
        footer={() => <UploadForm cid={selectedRowKeys[0]} />}
      >
        <Column title="Address" dataIndex="addr" />
        <Column title="Owner" dataIndex="owner" />
      </Table>
    );
  }
}

export default withFirebase(Clusters);
