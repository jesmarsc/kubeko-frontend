import React from 'react';
import Input from './Input';

class NewClusterForm extends React.Component {
  state = {
    clusterForm: {
      ip: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Cluster IP',
        },
        value: '',
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Cluster Password',
        },
        value: '',
      },
    },
  };

  render() {
    return (
      <form>
        <Input
          inputtype="input"
          type="url"
          name="ip"
          placeholder="Cluster IP Adress"
        />
        <Input
          inputtype="input"
          type="password"
          name="password"
          placeholder="Password"
        />
      </form>
    );
  }
}

export default NewClusterForm;
