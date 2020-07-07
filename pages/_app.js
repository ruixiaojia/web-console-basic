import React from "react";
import App from 'next/app';

import withRedux from '~/redux/redux'
import MainLayout from "~/common/main-layout";
import Container from "~/common/container";

import '~/common/common.scss';

@withRedux
class PageContainer extends App {
  componentDidMount() {
    const { router } = this.props;
    if (false) {
      // 未登录强制跳转至登录页
      if (router.route !== "/user/login") {
        router.replace("/user/login");
      }
    }
  }

  render () {
    const { Component, pageProps, router } = this.props;

    return (
      <Container>
        <MainLayout router={router}>
          <Component {...pageProps} router={router} />
        </MainLayout>
      </Container>
    );
  }
}

export default PageContainer;
