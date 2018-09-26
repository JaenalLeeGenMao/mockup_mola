const axios = require('axios')
const apiConfig = require('../global/config/api')

const apiHost = `${apiConfig[process.env.NODE_ENV].endpoints.molatv}`;
module.exports = {
  get (endPoint, token) {
    return new Promise((resolve, reject) => {
      let headers = {}
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }

      axios.get(`${apiHost}/${endPoint}`, {
        headers: headers
      })
        .then(response => {
          var data = response.data
          if (typeof data.data !== 'undefined') {
            data = data.data
          }
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  post (endPoint, token, payload) {
    return new Promise((resolve, reject) => {
      let headers = {}
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
      headers.ContentType = 'application/json'

      axios.post(`${apiHost}/${endPoint}`, payload, {
        headers: headers
      })
        .then(response => {
          var data = response.data
          if (typeof data.data !== 'undefined') {
            data = data.data
          }
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  put (endPoint, token, payload) {
    return new Promise((resolve, reject) => {
      let headers = {}
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
      headers.ContentType = 'application/json'

      axios.put(`${apiHost}/${endPoint}`, payload, {
        headers: headers
      })
        .then(response => {
          var data = response.data
          if (typeof data.data !== 'undefined') {
            data = data.data
          }
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
