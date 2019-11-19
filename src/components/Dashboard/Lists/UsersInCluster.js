import React, { memo, useEffect, useCallback, useReducer } from 'react';
import { Table, Button } from 'antd';

import { withFirebase } from '@firebase-api';

const columns = [
  {
    title: 'Users',
    dataIndex: 'uid'
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (text, record) => (
      <Button type="link" onClick={record.remove}>
        Kick User
      </Button>
    )
  }
];

/* users: array of objects */
const usersReducer = (users, action) => {
  switch (action.type) {
    case 'SET': {
      const newUsers = action.users ? action.users : {};
      return Object.keys(newUsers).map(uid => ({ key: uid, uid }));
    }
    case 'ADD': {
      const { uid, remove } = action;
      const newUsers = [...users, { key: uid, uid, remove }];
      return newUsers;
    }
    case 'DELETE': {
      return users.filter(user => user.uid !== action.uid);
    }
    default:
      throw new Error('Invalid action.type');
  }
};

const UsersInCluster = memo(({ cid, firebase }) => {
  const [users, usersDispatch] = useReducer(usersReducer, []);

  const removeUser = useCallback(
    uid => {
      const updates = {
        [`users/${uid}/deployments/${cid}`]: null,
        [`clusters-users/${cid}/${uid}`]: null
      };

      firebase.db.ref().update(updates);
    },
    [cid, firebase]
  );

  useEffect(() => {
    const clusterUsersRef = firebase.db.ref(`clusters-users/${cid}`);

    clusterUsersRef.on('child_added', snapshot => {
      const uid = snapshot.key;
      usersDispatch({ type: 'ADD', uid, remove: () => removeUser(uid) });
    });

    clusterUsersRef.on('child_removed', snapshot => {
      const uid = snapshot.key;
      usersDispatch({ type: 'DELETE', uid });
    });

    return () => {
      clusterUsersRef.off();
    };
  }, [cid, firebase, removeUser]);

  return (
    <Table
      title={() => (
        <h3>
          <strong>Cluster: {cid}</strong>
        </h3>
      )}
      locale={{ emptyText: 'No Users' }}
      size="middle"
      columns={columns}
      dataSource={users}
    />
  );
});

export default withFirebase(UsersInCluster);
