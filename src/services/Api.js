import axios from 'axios'

const create = () => {
  return axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    withCredentials: false,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const get = (uri) => {
  return create().get(uri)
}
