import { all } from 'redux-saga/effects';
import {
  watchFetchEmployeesSaga,
  watchCreateEmployeeSaga
} from './features/Home/Home.sack';

export default function* sacks() {
  yield all([
    watchFetchEmployeesSaga(),
    watchCreateEmployeeSaga(),
  ]);
}
