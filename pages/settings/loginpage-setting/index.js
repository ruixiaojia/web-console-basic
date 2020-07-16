import React from 'react';
import { Upload, Modal, Button, message, Spin } from 'antd';
import { EyeOutlined, DeleteOutlined, ExclamationCircleOutlined, CloudUploadOutlined } from '@ant-design/icons';
import JsCookies from "js-cookie";

import { get, post } from '~/lib/io'

import style from "./index.scss";

class Home extends React.Component {
  constructor () {
    super();
    this.state = {
      loading: true,
      uploading: false,
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList: [],
    };
  };

  componentDidMount() {
    this.requestImageList();
  }

  requestImageList = async () => {
    const { success, data } = await post('/setting/list/get', {
      imageSize: '120x120'
    });
    if (success) {
      this.setState({
        loading: false,
        fileList: data.results,
      })
    }
  }

  handleStatusCheck = (key) => this.setState({ [key]: !this.state[key] });

  handlePreview = item => {
    this.setState({
      previewVisible: true,
      previewImage: item.url,
      previewTitle: item.name,
    });
  };

  handleDeleteImage = async item => {
    Modal.confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        this.setState({
          loading: true,
        });

        const { success } = await post('/setting/image/delete', {
          name: item.name,
        });
        if (success) {
          message.success('Delete Success');
          this.requestImageList()  
        } else {
          message.error('Delete Error');
          this.setState({
            loading: false,
          })
        }
      },
    });
  }
  
  handleBeforeUpload = (file) => {
    this.setState({ uploading: true });
  };

  handleChange = ({event, file, fileList}) => {
    if (file.status === 'done') {
      message.success('Upload Success');
      this.setState({
        uploading: false,
      })
      this.requestImageList()
    }
  };

  render () {
    const { previewVisible, previewImage, fileList, previewTitle, uploading } = this.state;

    return (
      <div>
        <Upload
          multiple
          action="http://127.0.0.1:7001/setting/image/update"
          headers={{
            Folder: 'background',
            Authorization: `Bearer ${JsCookies.get("AUTHORIZATION")}`,
          }}
          showUploadList={false}
          onChange={this.handleChange}
          beforeUpload={this.handleBeforeUpload}
        >
          <Button
            loading={uploading}
            type="primary"
          >
            <CloudUploadOutlined />{uploading ? 'Uploading' : 'Start Upload'}
          </Button>
        </Upload>

        <Spin spinning={this.state.loading} delay={500}>
          <ul className={style['image_list_block']}>
            {fileList.map((item, index) => (
              <li className={style['image_list_item']} key={item.name}>
                <div className={style['image_operation']}>
                  <EyeOutlined onClick={() => this.handlePreview(item)} />
                  <DeleteOutlined onClick={() => this.handleDeleteImage(item)} />
                </div>
                <img src={item.proUrl} />
              </li>)
            )}
          </ul>
        </Spin>

        <Modal
          visible={previewVisible}
          title={previewTitle}
          onOk={() => {this.handleStatusCheck('previewVisible')}}
          onCancel={() => {this.handleStatusCheck('previewVisible')}}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  };
}
export default Home;