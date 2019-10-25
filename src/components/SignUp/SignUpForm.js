import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import { Button, message } from 'antd';
import * as Yup from 'yup';

import { withFirebase } from '@firebase-api';
import * as ROUTES from '@constants/routes';
import styles from '@styles/Forms.module.scss';

const SignUpFormBase = ({ errors, touched, isSubmitting }) => {
  return (
    <Form>
      <label className={styles.Label}>
        <Field
          className={styles.Input}
          style={
            errors.email &&
            touched.email && {
              borderBottom: '2px solid red'
            }
          }
          type="email"
          name="email"
        />
        Email
        <ErrorMessage
          style={{ float: 'right' }}
          name="email"
          component="span"
        />
      </label>

      <label className={styles.Label}>
        <Field
          className={styles.Input}
          style={
            errors.password &&
            touched.password && { borderBottom: '2px solid red' }
          }
          type="password"
          name="password"
        />
        Password
        <ErrorMessage
          style={{ float: 'right' }}
          name="password"
          component="span"
        />
      </label>

      <label className={styles.Label}>
        <Field
          className={styles.Input}
          style={
            errors.confirmPassword &&
            touched.confirmPassword && { borderBottom: '2px solid red' }
          }
          type="password"
          name="confirmPassword"
        />
        Confirm password
        <ErrorMessage
          style={{ float: 'right' }}
          name="confirmPassword"
          component="span"
        />
      </label>

      <ErrorMessage name="submit" component="div" />
      <Button
        name="submit"
        className={styles.SubmitButton}
        htmlType="submit"
        type="primary"
        block
        loading={isSubmitting}
      >
        Sign up
      </Button>
    </Form>
  );
};

const LoginForm = withFormik({
  mapPropsToValues: () => ({ email: '', password: '', confirmPassword: '' }),
  handleSubmit(
    { email, password },
    { props, resetForm, setErrors, setTouched, setSubmitting }
  ) {
    setSubmitting(true);
    setTouched({ submit: true });
    props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return props.firebase.user(authUser.user.uid).set({ email });
      })
      .then(() => {
        props.firebase.doSendEmailVerification();
        message.info(
          'A verification email has been sent, please look in your inbox or spam.',
          10
        );
      })
      .then(() => {
        resetForm();
        props.history.push(ROUTES.LANDING);
      })
      .catch(error => {
        setErrors({ submit: error.message });
        setSubmitting(false);
      });
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('Email must be valid.')
      .required('Email is required.'),
    password: Yup.string()
      .min(8, 'Your password must be atleast 8 characters long.')
      .required('Password is required.'),
    confirmPassword: Yup.string()
      .required('Confirmation is required.')
      .test('confirmPassword', 'Passwords do not match.', function(value) {
        return this.parent.password === value;
      })
  })
})(SignUpFormBase);

export default withRouter(withFirebase(LoginForm));
