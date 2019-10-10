import React from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'antd';
import * as ROUTES from '../../constants/routes';
import * as Yup from 'yup';
import styles from '../Forms/Forms.module.scss';

const LoginFormBase = ({ errors, touched, isSubmitting }) => {
  return (
    <Form>
      <label className={styles.Label}>
        <Field
          className={styles.Input}
          style={
            errors.email &&
            touched.email && {
              borderBottom: '2px solid red',
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
      <ErrorMessage name="submit" component="div" />
      <Button
        name="submit"
        className={styles.SubmitButton}
        htmlType="submit"
        type="primary"
        block
        loading={isSubmitting}
      >
        Log in
      </Button>
    </Form>
  );
};

const LoginForm = withFormik({
  mapPropsToValues: () => ({ email: '', password: '' }),
  handleSubmit(
    values,
    { props, resetForm, setErrors, setTouched, setSubmitting }
  ) {
    setSubmitting(true);
    setTouched({ submit: true });

    props.firebase
      .doSignInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        resetForm();
        props.history.push(ROUTES.DASH);
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
      .min(8, 'Password must be atleast 8 characters long.')
      .required('Password is required.'),
  }),
})(LoginFormBase);

export default withRouter(withFirebase(LoginForm));
