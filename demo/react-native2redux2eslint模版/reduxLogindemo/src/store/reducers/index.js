import { combineReducers } from 'redux';
import RefreshReducer from './RefreshReducer';

export default combineReducers({
  refresh: RefreshReducer,
});
