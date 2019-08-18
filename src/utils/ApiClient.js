import axios from 'axios'

export const getEmployeesRequest = () => axios({
  method: 'get',
  url: 'https://employeesservice00.herokuapp.com/employees',
  headers: {
    Authorization: '1q2wee3er4r',
    'Content-type': 'application/json'
  }
})

export const createEmployeeRequest = ({ token = '', ...employee }) => axios({
  method: 'post',
  url: 'https://employeesservice00.herokuapp.com/employees',
  headers: {
    Authorization: token,
    'Content-type': 'application/json'
  },
  data: JSON.stringify(employee)
})

export const editEmployeeRequest = ({ token = '', ...employee }) => axios({
  method: 'put',
  url: 'https://employeesservice00.herokuapp.com/employees',
  headers: {
    Authorization: token,
    'Content-type': 'application/json'
  },
  data: JSON.stringify(employee)
})

export const deleteEmployeeRequest = ({ token = '', ...employee }) => axios({
  method: 'delete',
  url: 'https://employeesservice00.herokuapp.com/employees',
  headers: {
    Authorization: token,
    'Content-type': 'application/json'
  },
  data: JSON.stringify(employee)
})
