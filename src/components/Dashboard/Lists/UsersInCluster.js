import React, { memo, useEffect, useCallback, useReducer } from 'react';
import { Table } from 'antd';

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
      <Button type="link" onClick={record.removeUser}>
        Kick User
      </Button>
    )
  }
];

/* users: array of objects */
const usersReducer = (users, action) => {
  switch (action.type) {
    case 'SET':
      return action.users;
    case 'ADD':
      return users.push({ uid: action.uid });
  }
};

const UsersInCluster = memo(({ cid }) => {
  const [users, usersDispatch] = useReducer(usersReducer, []);

  useEffect(() => {
    const clusterUsersRef = firebase.db.ref(`clusters-users/${cid}`);

    clusterUsersRef.once('value').then(snapshot => {
      console.log(snapshot.val());
    });

    return () => {
      clusterUsersRef();
    };
  }, []);

  return <div></div>;
});

export default withFirebase(UsersInCluster);
