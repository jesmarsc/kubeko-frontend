import React from 'react';
import LoginFormik from './LoginFormik';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import styles from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <div className={styles.FormContainer}>
      <LoginFormik />
      <Link to={ROUTES.SIGN_UP}>Don't have an account? Sign up now!</Link>
    </div>
  );
};

export default LoginPage;
