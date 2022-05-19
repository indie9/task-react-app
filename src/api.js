import { type } from "@testing-library/user-event/dist/type";
import Header from "./components/header/header";
import { events } from "./store";

const url = 'http://93.95.97.34/api'

const request = async (url, method = 'GET', body) => {
  //console.log("responce",url)
  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-type': 'application/json'
    })
  });


  return await response.json();
}


const axios = require('axios').default;
const inst = axios.create({
    baseURL: 'http://93.95.97.34/api'
})



export const getTasks = (preFilter,page) => {
  return inst.post('/tasks', {
      filter: {
        ...preFilter
      },
      page: page,
      limit: 8
  })
      .then((res) => {return res.data})
      .catch((err) => {})
}



export const getUsers = (page) => {
  return inst.post('/users', {
      filter: {},
      page: page,
      limit: 8
  })
      .then((res) => {
          return res.data;
      })
      .catch((err) => {
      })
}


export const getAllUsers = () => {
  return request(`${url}/users/all`);
}


export const userLogin = (data) => {
  return request(`${url}/users/login`, 'POST', data);
}

export const getUser = (id) => {
  return request(`${url}/users/${id}`);
}
export const addTask = ( (taskData) => {
  return request(`${url}/tasks/createOrEdit`, 'PUT', taskData)
})

export const getTask = ( (id) => {
  return request(`${url}/tasks/${id}`)
})
export const editUser = (form) => {
  return request(`${url}/users/edit`,'PUT', form);
}

export const getComments = ( (id) => {
  return request(`${url}/comments/${id}`)
})

export const addComment = ( (commentData) => {
  return request(`${url}/comments/createOrEdit`, 'PUT', commentData)
})
export const removeComment = ( (id) => {
  return request(`${url}/comments/${id}`, 'DELETE')
})
export const addTime = ( (id,timeData) => {
  return request(`${url}/tasks/${id}/worktime`, 'PATCH', timeData)
})
export const changeStatus = ( (id,status) => {
  return request(`${url}/tasks/${id}/status/${status}`, 'PATCH')
})

export const deleteTask = (id) => {
  console.log(`${url}/tasks/${id}`)
  return request(`${url}/tasks/${id}`,'DELETE');
}


