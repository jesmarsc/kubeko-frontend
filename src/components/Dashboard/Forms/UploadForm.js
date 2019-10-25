import React from 'react';
import { Upload, Button, Icon, message } from 'antd';
import axios from 'axios';

import styles from './UploadForm.module.scss';

class UploadForm extends React.Component {
  state = {
    fileList: [],
    uploading: false
  };

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true
    });

    axios
      .post('https://jsonplaceholder.typicode.com/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(response => {
        this.setState({ fileList: [], uploading: false });
        message.success('Successfully deployed.', 3);
        console.log(response);
      })
      .catch(error => console.log(error.message));
  };

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };

    return (
      <ul className={styles.Container}>
        <li>
          <Button
            type="primary"
            onClick={this.handleUpload}
            disabled={fileList.length === 0}
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

export default UploadForm;
