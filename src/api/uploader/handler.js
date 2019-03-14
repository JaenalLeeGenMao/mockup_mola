import { get, post, delete as axiosDelete } from 'axios'
import qs from 'query-string'
import { UPLOADER_ENDPOINT } from './endpoints'

import { uploader } from '@source/config'

const uploadImage = file => {
  const body = { file, client_id: uploader.clientId, ptoken: uploader.ptoken }
  var formData = new FormData() // Currently empty
  formData.append('file', file)
  formData.append('client_id', uploader.clientId)
  formData.append('ptoken', uploader.ptoken)
  return post(`${UPLOADER_ENDPOINT}/image/upload`, formData, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  })
    .then(response => {
      return {
        meta: {
          status: 'success',
        },
        data: response.data,
      }
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error,
        },
        data: {},
      }
    })
}

const getImageCDN = (path, token) => {
  const params = { client_id: uploader.clientId, path, token }
  console.log(params)
  return get(`${UPLOADER_ENDPOINT}/image/status`, {
    params,
  })
    .then(response => {
      return {
        meta: {
          status: 'success',
        },
        data: response.data,
      }
    })
    .catch(error => {
      return {
        meta: {
          status: 'error',
          error,
        },
        data: {},
      }
    })
}

export default {
  uploadImage,
  getImageCDN,
}
