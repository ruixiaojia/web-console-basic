import React from 'react'
import { Provider } from 'react-redux'

import { initializeStore } from './store'

function withRedux (App, internalScope) {
  // 全局使用一个 store 实例 
  let globalStore

  return class extends React.PureComponent {
    static displayName = `withRedux(${App.displayName || App.name || 'App'})`

    static async getInitialProps (context) {
      // 创建 store
      globalStore = initializeStore();
      // context 注入 store
      context.store = globalStore

      const pageProps =
      typeof App.getInitialProps === 'function'
        ? await App.getInitialProps(context)
        : {}

      return {
        ...pageProps,
        initialStore: globalStore.getState(),
      }
    }

    // 无论 server、browser 均执行
    // getInitialProps 结果将作为 props 注入
    constructor (props, ...rest) {
      super(props, ...rest)

      // 确保 store 可用
      if (!globalStore) {
        globalStore = initializeStore()
      }
    }

    render () {
      return (
        <Provider store={globalStore}>
          <App {...this.props} dispatch={globalStore.dispatch} store={globalStore} />
        </Provider>
      )
    }
  }
};

export default withRedux;