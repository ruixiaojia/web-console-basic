import React from "react";
import App from 'next/app';
import MainLayout from "../common/main-layout";
import Container from "../common/container";

import 'antd/dist/antd.css';

class PageContainer extends App {
  render () {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Container>
    );
  }
}

export default PageContainer;
