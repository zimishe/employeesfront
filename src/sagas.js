import { all } from 'redux-saga/effects';
import {
  watchFetchEmployeesSaga,
  watchCreateEmployeeSaga,
  watchEditEmployeeSaga,
  watchDeleteEmployeeSaga
} from './features/Home/Home.sack';

export default function* sacks() {
  yield all([
    watchFetchEmployeesSaga(),
    watchCreateEmployeeSaga(),
    watchEditEmployeeSaga(),
    watchDeleteEmployeeSaga()
  ]);
}
