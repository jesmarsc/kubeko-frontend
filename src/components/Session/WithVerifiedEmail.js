import React from 'react';
import { Result, Button } from 'antd';

import AuthUserContext from './AuthUserContext';
import { withFirebase } from '@firebase-api';

const withVerifiedEmail = Component => {
  class WithVerifiedEmail extends React.Component {
    state = { sentEmail: false, title: 'Email must be verified.' };

    sendVerificationEmail = async () => {
      try {
        await this.props.firebase.doSendEmailVerification();
        this.setState({
          sentEmail: true,
          title:
            'Email sent, please check your inbox or spam and refresh the page after verifying.'
        });
      } catch (error) {
        this.setState({
          title:
            'An email has been recently sent, please wait before sending another. Refresh the page after verifying.'
        });
      }
    };

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            !authUser.emailVerified ? (
              <Result
                status="warning"
                title={this.state.title}
                extra={
                  <Button
                    type="primary"
                    onClick={this.sendVerificationEmail}
                    disabled={this.state.sentEmail}
                  >
                    Send Email
                  </Button>
                }
              />
            ) : (
              <Component {...this.props} />
            )
          }
        </AuthUserContext.Consumer>
      );
    }
  }
  return withFirebase(WithVerifiedEmail);
};

export default withVerifiedEmail;
