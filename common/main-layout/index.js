import React from "react";
import { Layout, Menu, Dropdown } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import './index.scss'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  render() {
    const { props } = this;
    const { collapsed, selectedKeys, openKeys, menuList } = this.state;
    return (
      <div className="main-layout-container">
        <Sider
          trigger={null}
          className="sider-block"
          collapsible
          collapsed={collapsed}
          collapsedWidth="80"
        >
          {/* <div className={"al-logo"}>
            <img
                style={{
                width: false === collapsed ? props.logoWidth || 210 : props.collapsedLogoWidth || 80,
              }}
                src={collapsed && props.collapsedLogo ? props.collapsedLogo : props.logo}
            />
          </div> */}
          {/* <Menu
              theme="dark"
              mode="inline"
              style={{ lineHeight: "64px" }}
              onSelect={this.onSelect}
              selectedKeys={selectedKeys}
              onOpenChange={this.onOpenChange}
              openKeys={openKeys}
            // forceSubMenuRender={true}
          >
            {renderMenu({ ...props, menuList }, collapsed)}
          </Menu> */}
        </Sider>

        <Layout className="main-container">
          <Header className="header-block">
            { collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined /> }
            <div className="header-right">
              {/* {props.headerRightOperation ? (
                props.headerRightOperation()
              ) : (
                <>
                  <img className={"al-user-profile"} src={props.userProfile} />
                  <Dropdown overlay={renderLoginMenu(props)} className={"al-user-info"}>
                    <div>
                      <span>{props.userName}</span>
                      <Icon style={{ marginLeft: "6px" }} type="down" />
                    </div>
                  </Dropdown>
                  <Dropdown overlay={renderLangmenu(props)} style={{ width: 200, marginLeft: 20 }}>
                    <Icon style={{ fontSize: "18px" }} type="global" />
                  </Dropdown>
                </>
              )} */}
            </div>
          </Header>
          <Content className="content-block">
            <div>{props.children}</div>
          </Content>
        </Layout>
      </div>
    );
  }
}
