import React from 'react';
import { withFirebase } from '../Firebase';
import { Button } from 'antd';

const SignOutButton = ({ firebase }) => {
  return (
    <Button size="large" onClick={firebase.doSignOut}>
      Sign Out
    </Button>
  );
};

export default withFirebase(SignOutButton);
