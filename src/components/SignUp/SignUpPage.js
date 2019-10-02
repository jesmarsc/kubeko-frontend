import React from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import * as ROUTES from '../../constants/routes';

import styles from '../Login/LoginPage.module.css';

const SignUpPage = () => {
  return (
    <div className={styles.FormContainer}>
      <SignUpForm />
      <Link to={ROUTES.SIGN_IN}>Already have an account? Log in now!</Link>
    </div>
  );
};

export default SignUpPage;
