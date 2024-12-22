import { combineReducers } from 'redux';
import { worddata, loading, themeColor } from '../Redux/reducer';

export default combineReducers({
  worddata,
  isLoading: loading,
  themeColor,
});
