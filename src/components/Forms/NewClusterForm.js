import React from 'react';
import Input from './Input';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class NewClusterForm extends React.Component {
  state = {
    formControls: {
      email: {
        value: '',
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
      },
      password: {
        value: '',
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
      },
    },
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.firebase
      .doSignInWithEmailAndPassword(
        this.state.formControls.email.value,
        this.state.formControls.password.value
      )
      .then(() => this.props.history.push(ROUTES.LANDING))
      .catch(error => console.log(error));
  };

  onChange = event => {
    const savedTarget = event.target;
    this.setState(prevState => {
      const updatedForm = { ...prevState.formControls };
      const updatedFormElement = {
        ...updatedForm[savedTarget.name],
        value: savedTarget.value,
      };
      updatedForm[savedTarget.name] = updatedFormElement;
      return { formControls: updatedForm };
    });
  };

  render() {
    const formElements = Object.keys(this.state.formControls).map(key => {
      const element = { ...this.state.formControls[key], name: key };
      return (
        <Input
          key={element.name}
          name={element.name}
          elementType={element.elementType}
          elementConfig={element.elementConfig}
          value={element.value}
          onChange={this.onChange}
        />
      );
    });

    return (
      <form onSubmit={this.onSubmit}>
        {formElements}
        <button type="submit">Login</button>
      </form>
    );
  }
}

export default withRouter(withFirebase(NewClusterForm));
