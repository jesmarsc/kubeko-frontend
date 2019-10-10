import React from 'react';
import AuthUserContext from './AuthUserContext';
import { Result, Button } from 'antd';
import { withFirebase } from '../Firebase';

const withVerifiedEmail = Component => {
  class WithVerifiedEmail extends React.Component {
    state = { sentEmail: false, title: 'Email must be verified.' };

    sendVerificationEmail = () => {
      this.props.firebase
        .doSendEmailVerification()
        .then(() =>
          this.setState({
            sentEmail: true,
            title:
              'Email sent, please check your inbox or spam and refresh the page after verifying.',
          })
        )
        .catch(() =>
          this.setState({
            title:
              'An email has been recently sent, please wait before sending another. Refresh the page after verifying.',
          })
        );
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
