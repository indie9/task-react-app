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

export const getEvents = () => {
  console.log("hello")
  return request(`${url}/tasks`, 'POST', {
    "filter": {},
    "page": 0,
    "limit": 0
  });
}
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
