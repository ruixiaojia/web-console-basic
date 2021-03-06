import React from 'react';
import _ from 'lodash'
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
      requesting: false,
    };
  };
  onFinish = async values => {
    const { dispatch, router } = this.props;
    this.setState({
      requesting: true,
    });

    try {
      const { success, data } = await post('/user/login', values);
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
          if (router.query.return_url) {
            router.replace(router.query.return_url)
          } else {
            router.replace('/')
          }
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
    } catch (err) {

    }

    this.setState({
      requesting: false,
    })
  };

  render () {
    const { pageConfig = {} } = this.props;
    const { requesting } = this.state;

    return (
      <div className={style['user_login_container']}>
        <div className={style['background_block']} style={{backgroundImage: `url(${pageConfig.imageUrl})`}} />
        <div className={style['login_block']}>
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
              className={style["btn_login"]}
              loading={requesting}
              disabled={requesting}
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    );
  };
}
Home.getInitialProps = async (ctx) => {
  const resp = await post('/login/config/get')
  if (_.get(resp, 'success')) {
    return { pageConfig: _.get(resp, 'data', {}) }
  }
  return {}
}
export default Home;