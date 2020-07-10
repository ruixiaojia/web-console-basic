import React, { Component } from "react";
import { Layout, Menu, Dropdown, Avatar, Modal } from 'antd';
import Icon, { CopyrightTwoTone, UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import JsCookies from "js-cookie";

import menuList from "./config/menu-list.config";
import simplePageList from "./config/simple-page.config";
import { get, post } from '~/lib/io'

import style from './index.scss';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function renderMenuItem(collapsed, toMenuPage) {
  const menuEles = [];

  const menuLoop = (menuList, isOneLevelMenu) => {
    const menuArr = [];
    if (!menuList) return menuArr;

    menuList.forEach((item, index) => {
      const { name, icon, path, sub } = item;
      if (sub) {
        const subMenus = menuLoop(item.sub);
        if (subMenus.length) {
          menuArr.push(
            <SubMenu
              key={`sub_${item.name + index}`}
              title={
                <span>
                  {isOneLevelMenu ? <Icon component={icon} /> : null}
                  {collapsed && isOneLevelMenu ? null : name}
                </span>
              }
            >{subMenus}</SubMenu>
          );
        }
      } else {
        menuArr.push(
          <Menu.Item onClick={() => toMenuPage(item)} key={path + index}>
            <span>
              {isOneLevelMenu ? <Icon component={icon} /> : null}
              {collapsed && isOneLevelMenu ? null : name}
            </span>
          </Menu.Item>
        );
      }
    });
    return menuArr;
  };
  menuEles.push(menuLoop(menuList, true));
  return menuEles;
}

class MainLayout extends React.Component {
  state = {
    isSimplePage: true,
    collapsed: false,
    menuList: [],
  }

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      isSimplePage: simplePageList.indexOf(props.router.route) !== -1,
    }
  }

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  toMenuPage = (item) => {
    this.props.router.push(item.path)
  };

  signOut = () => {
    const { dispatch, router } = this.props;

    Modal.confirm({
      title: 'Do you Want to sign out?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        JsCookies.remove("AUTHORIZATION");
        dispatch({type: 'LOGIN_OUT'});
        // 阻止退出登录后history back
        window.location.replace('/user/login')
      },
      onCancel() {},
    });
  };

  renderMenuList = () => {
    return (
      <Menu>
        <Menu.Item onClick={() => { this.props.router.push('/home/user-settings')}}>
          Settings
        </Menu.Item>
        <Menu.Item onClick={this.signOut}>
          Sign out
        </Menu.Item>
      </Menu>
    )
  };

  render() {
    if(this.state.isSimplePage) {
      return this.props.children;
    }
    return (
      <Layout className={style["main-layout-container"]}>
        <Sider
          className={style["sider-block"]}
          theme="light"
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className={style['logo']}>
            <img src={require("../images/logo.png")} />
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={['/home0']}
          >
            {renderMenuItem(this.state.collapsed, this.toMenuPage)}
          </Menu>
        </Sider>
        
        <Layout className={style["main-container"]}>
          <Header className={style["header-block"]}>
            <div></div>
            <Dropdown overlay={this.renderMenuList} className={style["user_info"]}>
              <Avatar size="small" icon={<UserOutlined />} />
            </Dropdown>
          </Header>

          <Content className={style["content-block"]}>
            {this.props.children}
          </Content>

          <Footer className={style["footer-block"]}>
            <CopyrightTwoTone twoToneColor='#f30' /> 2020 Created by Ruixiaojia.
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;