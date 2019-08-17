import { put, call, takeEvery } from 'redux-saga/effects'
import {
  getEmployeesRequest,
  createEmployeeRequest
} from '../../utils/ApiClient'

import {
  FETCH_EMPLOYEES,
  FETCH_EMPLOYEES_SUCCEED,
  FETCH_EMPLOYEES_FAILED,
  CREATE_EMPLOYEE,
  CREATE_EMPLOYEE_SUCCEED,
  CREATE_EMPLOYEE_FAILED
} from './actions'

const emptyObject = {}
const emptyArray = []

const defaultState = {
  error: false,
  list: emptyArray,
  fetching: false,
};

export const fetchEmployees = () => ({ type: FETCH_EMPLOYEES })
export const fetchEmployeesSucceed = payload => ({ type: FETCH_EMPLOYEES_SUCCEED, payload })
export const fetchEmployeesFailed = payload => ({ type: FETCH_EMPLOYEES_FAILED, payload })

export const createEmployee = payload => ({ type: CREATE_EMPLOYEE, payload })
export const createEmployeeSucceed = payload => ({ type: CREATE_EMPLOYEE_SUCCEED, payload })
export const createEmployeeFailed = payload => ({ type: CREATE_EMPLOYEE_FAILED, payload })

export const getEmployeesSelector = state => state.employees || emptyObject

export function* fetchEmployeesSaga(action) {
  try {
    const response = yield call(getEmployeesRequest)
    yield put(fetchEmployeesSucceed({ employees: response.data }));
  } catch (e) {
    yield put(fetchEmployeesFailed({ error: e.message }));
  }
}

export function* watchFetchEmployeesSaga() {
 yield takeEvery(FETCH_EMPLOYEES, fetchEmployeesSaga);
}

export function* createEmployeeSaga({ payload: { resolve, reject, values }}) {
  try {
    const response = yield call(createEmployeeRequest, values)
    yield put(createEmployeeSucceed({ employee: response.data ? response.data.employee : emptyObject }));
    yield call(resolve)
  } catch (e) {
    yield put(createEmployeeFailed({ error: e.message }));
    yield call(reject)
  }
}

export function* watchCreateEmployeeSaga() {
 yield takeEvery(CREATE_EMPLOYEE, createEmployeeSaga);
}

export const employees = (state = defaultState, { type, payload }) => {
  switch (type) {
    case FETCH_EMPLOYEES:
      return {
        ...state,
        fetching: true,
        error: false,
      }
    case `${FETCH_EMPLOYEES}_SUCCEED`:
      return {
        ...state,
        fetching: false,
        error: false,
        list: payload.employees
      }
    case `${FETCH_EMPLOYEES}_FAILED`:
      return {
        ...state,
        fetching: false,
        error: payload.error,
      }
    case CREATE_EMPLOYEE:
      return {
        ...state,
        fetching: true,
        error: false,
      }
    case `${CREATE_EMPLOYEE}_SUCCEED`:
      return {
        ...state,
        fetching: false,
        error: false,
        list: [...state.list, payload.employee]
      }
    case `${CREATE_EMPLOYEE}_FAILED`:
      return {
        ...state,
        fetching: false,
        error: payload.error,
      }
    default:
      return state;
  }
}
