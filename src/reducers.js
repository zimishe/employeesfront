import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import { employees } from './features/Home/Home.sack'

export default combineReducers({
  routing,
  employees
})
