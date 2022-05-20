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
  return inst.get('/users/all')
      .then((res) => {
          return res.data;
      })
      .catch((err) => {
      })
}

export const addTask = (taskData) => {
  return inst.put('tasks/createOrEdit',taskData)
}

export const userLogin = (data) => {
  return inst.post('users/login',data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
    })
}


export const getUser = (id) => {
  return inst.get(`users/${id}`)
      .then((res) => {
          return res.data;
      })
      .catch((err) => {
      })
}


export const getTask = (id) => {
  return inst.get(`tasks/${id}`)
      .then((res) => {
          return res.data;
      })
      .catch((err) => {
      })
}

export const editUser = (form) => {
  return inst.put('users/edit',form)
}


export const getComments = ( (id) => {
  return inst.get(`comments/${id}`)
    .then((res) => {
        return res.data;
    })
    .catch((err) => {
    })
})

export const addComment = ( (commentData) => {
  return inst.put('comments/createOrEdit',commentData)
})

export const removeComment = ( (id) => {
  return inst.delete(`comments/${id}`,id)
})

export const addTime = ( (id,timeData) => {
  return inst.patch(`tasks/${id}/worktime`,timeData)
})

export const changeStatus = ( (id,status) => {
  return inst.patch(`tasks/${id}/status/${status}`)
})

export const deleteTask = (id) => {
  return inst.delete(`tasks/${id}`)
}


