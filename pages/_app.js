import React from "react";
import App from 'next/app';
import MainLayout from "../common/main-layout";
import Container from "../common/container";

import '../common/common.scss';

let simplePageList = ["/user/login"]

class PageContainer extends App {
  constructor(props) {
    super(props);
    this.state = {
      isSimplePage: true,
    };
  }

  componentDidMount() {
    const { router } = this.props;
    
    if (simplePageList.indexOf(router.route) === -1) {
      this.setState({
        isSimplePage: false,
      })
    }
  }
  
  render () {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        {this.state.isSimplePage
          ? <Component {...pageProps} />
          : (<MainLayout>
              <Component {...pageProps} />
            </MainLayout>)
        }
      </Container>
    );
  }
}

export default PageContainer;
