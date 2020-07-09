import React from "react";
import App from 'next/app';
import JsCookies from "js-cookie";

import withRedux from '~/redux/redux'
import MainLayout from "~/common/main-layout";
import Container from "~/common/container";
import { get, post } from '~/lib/io'

import '~/common/common.scss';

@withRedux
class PageContainer extends App {
  async componentDidMount() {
    const { dispatch, store } = this.props;

    if (!store.getState().login.isSign) {
      const AuthToken = JsCookies.get("AUTHORIZATION");
      const getUser = await post('/user/getUser', '', {
        headers: {
          Authorization: 'Bearer ' + AuthToken
        }
      });

      if (getUser) {
        dispatch({ type: "LOGIN_IN", options: getUser.data });
      } else {
        this.ForcedToLogin();
      }
    } else {
      this.ForcedToLogin();
    }
  }

  ForcedToLogin = () => {
    const { router } = this.props;
    if (router.route !== "/user/login") {
      router.replace({
        pathname: '/user/login',
        query: { return_url: router.route }
      });
    }
  };

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
