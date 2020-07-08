import { combineReducers } from 'redux'
import login from './login'
import count from './counter'

export default combineReducers({
  login,
  count,
})