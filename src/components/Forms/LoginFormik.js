import React from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'antd';
import * as ROUTES from '../../constants/routes';
import * as Yup from 'yup';
import styles from './LoginFormik.module.css';

const LoginFormBase = ({ errors, touched, isSubmitting }) => {
  return (
    <Form>
      <div>
        <ErrorMessage name="email" component="div" />
        <Field
          className={styles.Input}
          style={
            errors.email && touched.email && { borderBottom: '2px solid red' }
          }
          type="email"
          name="email"
          placeholder="Email"
        />
      </div>
      <div>
        <ErrorMessage name="password" component="div" />
        <Field
          className={styles.Input}
          style={
            errors.password &&
            touched.password && { borderBottom: '2px solid red' }
          }
          type="password"
          name="password"
          placeholder="Password"
        />
      </div>
      <Button htmlType="submit" type="primary" block loading={isSubmitting}>
        Submit
      </Button>
    </Form>
  );
};

const LoginForm = withFormik({
  mapPropsToValues() {
    return {
      email: '',
      password: '',
    };
  },
  handleSubmit(values, { props, resetForm, setErrors, setSubmitting }) {
    setSubmitting(true);
    props.firebase
      .doSignInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        resetForm();
        props.history.push(ROUTES.DASH);
      })
      .catch(error => setErrors({ submit: error }));
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Email must be a valid.')
      .required('Please enter your email.'),
    password: Yup.string()
      .min(8, 'Your password must be atleast 8 characters.')
      .required('Please enter your password.'),
  }),
})(LoginFormBase);

export default withRouter(withFirebase(LoginForm));
