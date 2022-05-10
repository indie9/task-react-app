import { type } from "@testing-library/user-event/dist/type";
import Header from "./components/header/header";
import { events } from "./store";

const url = 'http://93.95.97.34/api'


const request = async (url, method = 'GET', body) => {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-type': 'application/json'
    })
  });


  return await response.json();
}

export const getTasks = (preFilter) => {
  console.log(preFilter)
  return request(`${url}/tasks`, 'POST', {
    "filter": {
      ...preFilter
    },
    "page": 0,
    "limit": 100
  });
}
export const getUsers = () => {
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

export const getOneEvent = (evt) => {
  return request(`${url}/${evt._id}`);
}

export const addEvent = (data => {
  const eventData ={
    ...data,
    favorite: false,
    archive: false,
  }
  return request(`${url}`, 'POST', eventData)
})

export const deleteEvent = (id) => {
  return request(`${url}/${id}`,'DELETE');
}

export const editEvent = (data) => {
  return request(`${url}`, 'PUT', data);
}

export const deleteArchive = () => {
  return request(`${url}/archive/delete`, 'DELETE');

}
