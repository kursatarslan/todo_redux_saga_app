import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { tasksReducer } from './tasks';


export default combineReducers({
  routing: routerReducer,
  tasks: tasksReducer
});