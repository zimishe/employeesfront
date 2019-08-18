import { put, call, takeEvery } from 'redux-saga/effects'
import {
  getEmployeesRequest,
  createEmployeeRequest,
  editEmployeeRequest,
  deleteEmployeeRequest
} from '../../utils/ApiClient'

import {
  FETCH_EMPLOYEES,
  FETCH_EMPLOYEES_SUCCEED,
  FETCH_EMPLOYEES_FAILED,
  CREATE_EMPLOYEE,
  CREATE_EMPLOYEE_SUCCEED,
  CREATE_EMPLOYEE_FAILED,
  EDIT_EMPLOYEE,
  EDIT_EMPLOYEE_SUCCEED,
  EDIT_EMPLOYEE_FAILED,
  DELETE_EMPLOYEE,
  DELETE_EMPLOYEE_SUCCEED,
  DELETE_EMPLOYEE_FAILED
} from './actions'

const emptyObject = {}
const emptyArray = []

const defaultState = {
  error: '',
  list: emptyArray,
  fetching: false,
};

export const fetchEmployees = () => ({ type: FETCH_EMPLOYEES })
export const fetchEmployeesSucceed = payload => ({ type: FETCH_EMPLOYEES_SUCCEED, payload })
export const fetchEmployeesFailed = payload => ({ type: FETCH_EMPLOYEES_FAILED, payload })

export const createEmployee = payload => ({ type: CREATE_EMPLOYEE, payload })
export const createEmployeeSucceed = payload => ({ type: CREATE_EMPLOYEE_SUCCEED, payload })
export const createEmployeeFailed = payload => ({ type: CREATE_EMPLOYEE_FAILED, payload })

export const editEmployee = payload => ({ type: EDIT_EMPLOYEE, payload })
export const editEmployeeSucceed = payload => ({ type: EDIT_EMPLOYEE_SUCCEED, payload })
export const editEmployeeFailed = payload => ({ type: EDIT_EMPLOYEE_FAILED, payload })

export const deleteEmployee = payload => ({ type: DELETE_EMPLOYEE, payload })
export const deleteEmployeeSucceed = payload => ({ type: DELETE_EMPLOYEE_SUCCEED, payload })
export const deleteEmployeeFailed = payload => ({ type: DELETE_EMPLOYEE_FAILED, payload })

export const getEmployeesSelector = state => state.employees || emptyObject

export function* fetchEmployeesSaga(action) {
  try {
    const response = yield call(getEmployeesRequest)
    yield put(fetchEmployeesSucceed({ employees: response.data }));
  } catch (e) {
    yield put(fetchEmployeesFailed({ error: e.response.status }));
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
    yield put(createEmployeeFailed({ error: e.response.status }));
    yield call(reject)
  }
}

export function* watchCreateEmployeeSaga() {
 yield takeEvery(CREATE_EMPLOYEE, createEmployeeSaga);
}

export function* editEmployeeSaga({ payload: { resolve, reject, values }}) {
  try {
    const response = yield call(editEmployeeRequest, values)
    yield put(editEmployeeSucceed({ employee: response.data ? response.data.employee : emptyObject }));
    yield call(resolve)
  } catch (e) {
    yield put(editEmployeeFailed({ error: e.response.status }));
    yield call(reject)
  }
}

export function* watchEditEmployeeSaga() {
 yield takeEvery(EDIT_EMPLOYEE, editEmployeeSaga);
}

export function* deleteEmployeeSaga({ payload }) {
  try {
    yield call(deleteEmployeeRequest, payload)
    yield put(deleteEmployeeSucceed({ id: payload.id }));
  } catch (e) {
    yield put(deleteEmployeeFailed({ error: e.response.status }));
  }
}

export function* watchDeleteEmployeeSaga() {
 yield takeEvery(DELETE_EMPLOYEE, deleteEmployeeSaga);
}

const updateEmployeesList = (list, employee) => {
  return [...list.filter(item => item.id !== employee.id), employee]
}

export const employees = (state = defaultState, { type, payload }) => {
  switch (type) {
    case FETCH_EMPLOYEES:
    case CREATE_EMPLOYEE:
    case EDIT_EMPLOYEE:
    case DELETE_EMPLOYEE:
      return {
        ...state,
        fetching: true,
        error: '',
      }
    case `${FETCH_EMPLOYEES}_SUCCEED`:
      return {
        ...state,
        fetching: false,
        error: '',
        list: payload.employees
      }
    case `${FETCH_EMPLOYEES}_FAILED`:
    case `${CREATE_EMPLOYEE}_FAILED`:
    case `${EDIT_EMPLOYEE}_FAILED`:
    case `${DELETE_EMPLOYEE}_FAILED`:
      return {
        ...state,
        fetching: false,
        error: payload.error,
      }
    case `${CREATE_EMPLOYEE}_SUCCEED`:
      return {
        ...state,
        fetching: false,
        error: '',
        list: [...state.list, payload.employee]
      }
    case `${EDIT_EMPLOYEE}_SUCCEED`:
      return {
        ...state,
        fetching: false,
        error: '',
        list: updateEmployeesList(state.list, payload.employee)
      }
    case `${DELETE_EMPLOYEE}_SUCCEED`:
      return {
        ...state,
        fetching: false,
        error: '',
        list: [...state.list.filter(item => item.id !== payload.id)]
      }
    default:
      return state;
  }
}
