import { get, post, delete as axiosDelete } from 'axios'
import qs from 'query-string'
import { UPLOADER_ENDPOINT } from './endpoints'

import { uploader } from '@source/config'

const uploadImage = file => {
  const body = { file, client_id: uploader.clientId, ptoken: uploader.ptoken }
  console.log(`${UPLOADER_ENDPOINT}/image/upload`)
  console.log(body)
  return post(`${UPLOADER_ENDPOINT}/image/upload`, body, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  })
    .then(response => {
      return {
        meta: {
          status: 'success',
        },
        data: response,
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
}
