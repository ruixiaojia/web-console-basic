import React from 'react';
import { Button } from 'antd';

import Counter from './components/counter'
import style from "./index.scss";

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

  render () {
    console.log('render', this.props)
    return (
      <div className={style['home-container']}>
        Welcome to next.js!
        <Counter />
        <Button type="primary" onClick={()=>{
          this.props.store.dispatch({ type: 'INCREMENT' })
        }}>Button</Button>
      </div>
    );
  };
}

export default Home;