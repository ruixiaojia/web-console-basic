import React from 'react';
import { Button } from 'antd';
import style from "./index.scss";

class Home extends React.Component {
    constructor () {
        super();
        this.state = {

        };
    };

    render () {
        return (
            <div className={style['home-container']}>
                Welcome to next.js!
                <Button type="primary">Button</Button>
            </div>
        );
    };
}
export default Home;