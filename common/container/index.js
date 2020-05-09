import React, { Component } from "react";

class Container extends Component {
    componentDidMount() {
        this.handleScroll();
    };
  
    componentDidUpdate() {
        this.handleScroll();
    };
  
    // 页面切换时，滚动到顶部或 hash 指定元素(next内置行为，保留)
    handleScroll() {
        let { hash } = window.location;
        hash = hash ? hash.substring(1) : false;
        let hadScrollToHash = false;

        if (hash) {
            const el = document.getElementById(hash);
            if (el) {
            setTimeout(() => el.scrollIntoView(), 0);
            hadScrollToHash = true;
            }
        }
        if (!hadScrollToHash) {
            // 未滚动到 hash 指定元素时，滚动到页面顶部
            window.scrollTo(0, 0);
        }
    };
  
    render() {
      return this.props.children;
    };
}

export default Container;
