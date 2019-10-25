import React from 'react';
import { Link } from 'react-router-dom';

import LoginForm from './LoginForm';
import * as ROUTES from '@constants/routes';
import styles from '@styles/FormsPage.module.scss';

const LoginPage = () => {
  return (
    <div className={styles.FormContainer}>
      <LoginForm />
      <Link to={ROUTES.SIGN_UP}>Don't have an account? Sign up now!</Link>
    </div>
  );
};

export default LoginPage;
