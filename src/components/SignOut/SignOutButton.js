import React from 'react';
import { Button } from 'antd';

import { withFirebase } from '@firebase-api';

const SignOutButton = ({ firebase }) => {
  return (
    <Button size="large" onClick={firebase.doSignOut}>
      Sign Out
    </Button>
  );
};

export default withFirebase(SignOutButton);
