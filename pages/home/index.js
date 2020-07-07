import React from 'react';
import { Button } from 'antd';

import withRedux from '~/redux/redux'
import { get, post } from '~/lib/io'
import Counter from './components/counter'

import style from "./index.scss";

@withRedux
class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    };
  };
  static async getInitialProps (appCtx) {
    return {
      initialProps: 1
    }
  }

  async componentDidMount() {
    const data = await get('http://testyapi.akulaku.com/mock/65/installment/api/json/vendor/account/history/detail.do', {})
  }

  render () {
    console.log('render', this.props)
    return (
      <div className={style['home-container']}>
        Welcome to next.js!
        <Counter />
        <Button type="primary" onClick={()=>{
          this.props.store.dispatch({ type: 'INCREMENT' })
          console.log(this.props)
        }}>Button</Button>
      </div>
    );
  };
}

export default Home;