import React from 'react';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import withRedux from '~/redux/redux'

import style from "./index.scss";

@withRedux
class Home extends React.Component {
  constructor () {
    super();

    this.state = {

    };
  };
  onFinish = values => {
    console.log('Success:', values);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render () {
    return (
      <div className={style['user-login-container']}>
        <div className={style['login-block']}>
          <Form
            name="basic"
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input prefix={<LockOutlined />} />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              className={style["btn-login"]}
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    );
  };
}
export default Home;