import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import { Button, message } from 'antd';
import * as Yup from 'yup';

import { withFirebase } from '@firebase-api';
import { withVerifiedEmail } from '@session';
import styles from '@styles/Forms.module.scss';

const ClusterFormBase = ({ errors, touched, isSubmitting }) => {
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
  handleSubmit(values, { props, resetForm, setSubmitting }) {
    setSubmitting(true);

    const uid = props.firebase.auth.currentUser.uid;
    const newCluster = props.firebase.clusters().push().key;

    const updates = {};
    updates[`/users/${uid}/clusters/${newCluster}`] = true;
    updates[`/clusters/${newCluster}`] = {
      owner: uid,
      addr: values.ip
    };

    props.firebase.db
      .ref()
      .update(updates)
      .then(() => message.success('Successfully added cluster.', 5))
      .catch(error => message.error(error.message, 5));

    resetForm();
  },

  validationSchema: Yup.object().shape({
    ip: Yup.string()
      .required('IP address is required.')
  })
})(ClusterFormBase);

export default withRouter(withFirebase(withVerifiedEmail(ClusterForm)));
