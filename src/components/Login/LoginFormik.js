import React from 'react';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'antd';
import * as ROUTES from '../../constants/routes';
import * as Yup from 'yup';
import styles from './LoginFormik.module.css';

const LoginFormBase = ({ errors, touched, isSubmitting }) => {
  console.log(errors);
  return (
    <Form>
      <div>
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
          placeholder="Email"
        />
        <ErrorMessage name="email" component="div" />
      </div>
      <div>
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
        <ErrorMessage name="password" component="div" />
      </div>
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
  mapPropsToValues() {
    return {
      email: '',
      password: '',
    };
  },
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
      .required('* Email required'),
    password: Yup.string()
      .min(8, 'Your password must be atleast 8 characters long.')
      .required('* Password required'),
  }),
})(LoginFormBase);

export default withRouter(withFirebase(LoginForm));
