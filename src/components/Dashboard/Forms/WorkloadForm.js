import React from 'react';
import { Upload, Button, Icon, message } from 'antd';
import axios from 'axios';

import { withFirebase } from '@firebase-api';
import styles from './WorkloadForm.module.scss';

class UploadForm extends React.Component {
  state = {
    fileList: [],
    uploading: false
  };

  handleUpload = async () => {
    const { fileList } = this.state;
    const formData = new FormData();
    formData.append('cid', this.props.cid);

    fileList.forEach(file => {
      formData.append(file.name, file);
    });

    try {
      this.setState({ uploading: true });
      const token = await this.props.firebase.auth.currentUser.getIdToken(true);

      await axios.post(
        'https://us-central1-kubeko.cloudfunctions.net/uploadFile',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        }
      );

      this.props.refresh();

      message.success('Successfully deployed.', 3);
    } catch (error) {
      message.error(error.message, 3);
    } finally {
      this.setState({ uploading: false, fileList: [] });
    }
  };

  removeFile = file => {
    this.setState(prevState => {
      const fileList = [...prevState.fileList];
      const fileIndex = fileList.indexOf(file);
      fileList.splice(fileIndex, 1);
      return { fileList };
    });
  };

  beforeUpload = file => {
    this.setState(prevState => ({ fileList: [...prevState.fileList, file] }));
    return false;
  };

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: this.removeFile,
      beforeUpload: this.beforeUpload,
      fileList
    };

    return (
      <ul className={styles.Container}>
        <li>
          <Button
            type="primary"
            onClick={this.handleUpload}
            disabled={fileList.length === 0 || !this.props.cid}
            loading={uploading}
          >
            {uploading ? 'Uploading' : 'Start Upload'}
          </Button>
        </li>
        <li>
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> Select File
            </Button>
          </Upload>
        </li>
      </ul>
    );
  }
}

export default withFirebase(UploadForm);
