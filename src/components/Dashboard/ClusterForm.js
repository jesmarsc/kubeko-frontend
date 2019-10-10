import React from 'react';
import { withFirebase } from '../Firebase';
import { withVerifiedEmail } from '../Session';

import { withRouter } from 'react-router-dom';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'antd';
import * as Yup from 'yup';
import styles from '../Login/LoginFormik.module.css';

const ClusterFormBase = ({ errors, touched, isSubmitting }) => {
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
          type="text"
          name="ip"
        />
        IP Address
        <ErrorMessage style={{ float: 'right' }} name="ip" component="span" />
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
        Submit
      </Button>
    </Form>
  );
};

const ClusterForm = withFormik({
  mapPropsToValues: () => ({ ip: '' }),
  handleSubmit(
    values,
    { props, resetForm, setErrors, setTouched, setSubmitting }
  ) {
    setSubmitting(true);
    setTouched({ submit: true });
    resetForm();
  },
  validationSchema: Yup.object().shape({
    ip: Yup.string()
      .matches(
        /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
        'Invalid IP Address.'
      )
      .required('IP address is required.'),
  }),
})(ClusterFormBase);

export default withRouter(withFirebase(withVerifiedEmail(ClusterForm)));
