import React from 'react';
import { Button } from 'antd';

import { get, post } from '~/lib/io'

class UserSettings extends React.Component {
  constructor (props) {
    super(props);
    this.state = {

    };
  };


  render () {
    console.log('user-settings' ,this.props)
    return (
      <div >
        user settings
      </div>
    );
  };
}

export default UserSettings;