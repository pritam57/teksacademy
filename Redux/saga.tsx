import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_DATA, SET_WORD_DATA } from './constants';
import { setWordData, setLoading } from "../Redux/action"

function* fetchDataSaga(action: any) {
  try {
    yield put(setLoading(true));
    // Update the number of results to 20
    const url = `https://randomuser.me/api/?results=20&page=${action.page}`;
    const response = yield call(axios.get, url);
    yield put(setWordData(response.data.results));
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    yield put(setLoading(false));
  }
}

function* rootSaga() {
  yield takeEvery(FETCH_DATA, fetchDataSaga);
}

export default rootSaga;
