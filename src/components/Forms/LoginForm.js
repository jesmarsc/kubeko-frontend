import React from 'react';
import Input from './Input';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { Button } from 'antd';
import * as ROUTES from '../../constants/routes';

class LoginForm extends React.Component {
  state = {
    formIsValid: false,
    formControls: {
      email: {
        value: '',
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
        },
        validation: {
          valid: false,
          required: true,
        },
        touched: false,
      },
      password: {
        value: '',
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        validation: {
          valid: false,
          required: true,
        },
        touched: false,
      },
    },
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    return isValid;
  }

  onSubmit = event => {
    event.preventDefault();
    console.log('hello');
    this.props.firebase
      .doSignInWithEmailAndPassword(
        this.state.formControls.email.value,
        this.state.formControls.password.value
      )
      .then(() => this.props.history.push(ROUTES.DASH))
      .catch(error => console.log(error));
  };

  onChange = event => {
    const savedTarget = event.target;
    this.setState(prevState => {
      const updatedForm = { ...prevState.formControls };
      const updatedFormElement = {
        ...updatedForm[savedTarget.name],
      };
      updatedFormElement.value = savedTarget.value;
      updatedFormElement.validation.valid = this.checkValidity(
        savedTarget.value,
        updatedFormElement.validation
      );
      updatedFormElement.touched = true;
      updatedForm[savedTarget.name] = updatedFormElement;

      const formIsValid = Object.keys(updatedForm).reduce(
        (accumulator, currentValue) =>
          updatedForm[currentValue].validation.valid && !!accumulator,
        true
      );

      return { formControls: updatedForm, formIsValid };
    });
  };

  render() {
    const formElements = Object.keys(this.state.formControls).map(key => {
      const element = { ...this.state.formControls[key], name: key };
      return (
        <Input
          invalid={!element.validation.valid}
          key={element.name}
          name={element.name}
          elementType={element.elementType}
          elementConfig={element.elementConfig}
          value={element.value}
          onChange={this.onChange}
          touched={element.touched}
        />
      );
    });

    return (
      <form onSubmit={this.onSubmit}>
        {formElements}
        <Button
          type="primary"
          htmlType="submit"
          disabled={!this.state.formIsValid}
        >
          Login
        </Button>
      </form>
    );
  }
}

export default withRouter(withFirebase(LoginForm));
