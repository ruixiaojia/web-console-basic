import { Layout, Menu } from 'antd';
import Router from 'next/router';
import Icon, { CopyrightTwoTone } from '@ant-design/icons';

import menuList from "./config/menu-list.config";
import simplePageList from "./config/simple-page.config";

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
    Router.push(item.path)
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