import React from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import JsCookies from "js-cookie";
import _get from 'lodash/get';
import md5 from 'md5';

import { get, post } from '~/lib/io';

import style from "./index.scss";

class Home extends React.Component {
  constructor () {
    super();
    this.state = {
      requesting: false,
    };
  };

  onFinish = async values => {
    const password = this.randomString(10);
    const AuthToken = JsCookies.get("AUTHORIZATION");
    const params = {
      // password: md5(password),
      password,
      ...values,
    }
    const resp = await post('/user/create', { ...params }, {
      headers: {
        Authorization: `Bearer ${AuthToken}`,
      }
    });
    if (_get(resp, 'success')) {
      Modal.success({
        title: 'Congratulations on creating a new user',
        okText: 'Copy',
        onOk: () => this.copyText(`username：${values.username}，password：${password}`),
        content: (
          <ul className={style['modal_create_success']}>
            <li>
              <span>username: </span>
              <span className={style['content_text']}>{ values.username }</span>
            </li>
            <li>
              <span>password: </span>
              <span className={style['content_text']}>{ password }</span>
            </li>
          </ul>
        ),
      });
    } else {
      message.error(_get(resp, 'errMsg', 'Network error, please try again later'));
    }
  };
  
  /**
   * 拷问文字至剪切板
   * @param {string} text 需要拷贝的文本
   */
  copyText = text => {
    let oInput = document.createElement("input");
    oInput.value = text;
    document.body.appendChild(oInput);
    oInput.select();
    let copyState = document.execCommand("Copy");
    oInput.style.display = "none";
    document.body.removeChild(oInput);
    if (copyState) {
      message.success('Copy Success');
    } else {
      message.error('Copy Error');
    }
  };

  /**
   * 随机生成字符串，排除易混淆字符
   * @param {number} len 字符串长度
   */
  randomString = len => {
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; // 排除易混淆字符
    let pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += chars[Math.floor(Math.random() * chars.length)]
    }
    return pwd;
  }

  render () {
    const { requesting } = this.state;
    return (
      <div className={style['new_user_container']}>
        <Form
          name="user_login_form"
          layout='vertical'
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 6 }}
          onFinish={this.onFinish}
        >
          <Form.Item
            label='Name'
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='User Name'
            name="username"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='E-mail'
            name='email'
            rules={[
              { required: true, message: 'Please input your password!' },
              { type: 'email' },
            ]}
          >
            <Input />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className={style["btn_create"]}
            loading={requesting}
            disabled={requesting}
          >
            Create New User
          </Button>
        </Form>
      </div>
    );
  };
}
export default Home;