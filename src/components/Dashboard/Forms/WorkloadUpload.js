import React, { Component } from 'react';
import { Table, Collapse, Icon } from 'antd';
import { withFirebase } from '@firebase-api';
import WorkloadForm from './WorkloadForm';

const { Panel } = Collapse;
const { Column } = Table;

class WorkloadUpload extends Component {
  state = {
    clusters: [],
    selectedRowKeys: [],
    loading: true,
  };

  selectRow = record => {
    this.setState({ selectedRowKeys: [record.key] });
  };

  onSelectedRowKeysChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  async componentDidMount() {
    const { firebase } = this.props;

    const snapshot = await firebase.clusters().once('value');
    const value = { ...snapshot.val() };

    const clusters = Object.keys(value).map(key => {
      const { addr, owner } = value[key];
      return { key, addr, owner };
    });

    this.setState({ clusters, loading: false });
  }

  render() {
    const { clusters, selectedRowKeys, loading } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
      type: 'radio',
    };
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
        <Panel header="New Workload" key="1" style={customPanel}>
          <Table
            size="middle"
            loading={loading}
            rowSelection={rowSelection}
            dataSource={clusters}
            onRow={record => ({ onClick: () => this.selectRow(record) })}
            footer={() => (
              <WorkloadForm
                cid={selectedRowKeys[0]}
                refresh={this.props.refresh}
              />
            )}
          >
            <Column title="Address" dataIndex="addr" />
            <Column title="Owner" dataIndex="owner" />
          </Table>
        </Panel>
      </Collapse>
    );
  }
}

export default withFirebase(WorkloadUpload);
