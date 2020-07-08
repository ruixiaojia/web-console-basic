import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { UserOutlined, LockOutlined, SmileTwoTone, FrownTwoTone } from '@ant-design/icons';

import withRedux from '~/redux/redux'
import { get, post } from '~/lib/io'

import style from "./index.scss";

@withRedux
class Home extends React.Component {
  constructor () {
    super();

    this.state = {

    };
  };
  onFinish = async values => {
    const { dispatch, router } = this.props;

    const { success, data } = await get('http://testyapi.akulaku.com/mock/65/installment/api/json/vendor/account/history/detail.do', values);
    if (success) {
      dispatch({ type: "LOGIN_IN", options: data });

      notification.open({
        duration: 1.5,
        message: 'Success',
        description:
          'Login successful, will jump',
        icon: <SmileTwoTone twoToneColor="#52c41a" />,
      });

      setTimeout(() => {
        router.push('/')
      }, 1000)
    } else {
      notification.open({
        duration: 3,
        message: 'Failure',
        description:
          'Logon failure, account or password error',
        icon: <FrownTwoTone twoToneColor="#f40" />,
      });
    }

  };

  render () {
    return (
      <div className={style['user-login-container']}>
        <div className={style['login-block']}>
          <Form
            name="user_login_form"
            onFinish={this.onFinish}
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
              <Input.Password visibilityToggle={false} prefix={<LockOutlined />} />
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