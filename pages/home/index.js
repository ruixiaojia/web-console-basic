import React from 'react';
import { Button } from 'antd';
import "./index.scss";

class Home extends React.Component {
    constructor () {
        super();
        this.state = {

        };
    };

    render () {
        return (
            <div className={'home-container'}>
                Welcome to next.js!
                <Button type="primary">Button</Button>
            </div>
        );
    };
}
export default Home;