import axios from 'axios'

const ENDPOINT_URL = 'https://employeesservice00.herokuapp.com/employees'

export const getEmployeesRequest = () => axios({
  method: 'get',
  url: ENDPOINT_URL,
  headers: {
    'Content-type': 'application/json'
  }
})

export const createEmployeeRequest = ({ token = '', ...employee }) => axios({
  method: 'post',
  url: ENDPOINT_URL,
  headers: {
    Authorization: token,
    'Content-type': 'application/json'
  },
  data: JSON.stringify(employee)
})

export const editEmployeeRequest = ({ token = '', ...employee }) => axios({
  method: 'put',
  url: ENDPOINT_URL,
  headers: {
    Authorization: token,
    'Content-type': 'application/json'
  },
  data: JSON.stringify(employee)
})

export const deleteEmployeeRequest = ({ token = '', ...employee }) => axios({
  method: 'delete',
  url: ENDPOINT_URL,
  headers: {
    Authorization: token,
    'Content-type': 'application/json'
  },
  data: JSON.stringify(employee)
})
