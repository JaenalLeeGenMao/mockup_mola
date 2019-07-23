import axios from 'axios'
import _get from 'lodash/get'

const production = process.env.REACT_APP_ENV === 'production'
const cookieName = production ? '_pst' : '_pst_staging'

const TOKEN_ENDPOINT = production ? 'https://mola.tv/api/v2/videos/_/pubsub' : 'https://stag.mola.tv/api/v2/videos/_/pubsub'

const PUBSUB_ENDPOINT = production
  ? 'https://pubsub.googleapis.com/v1/projects/supersoccer-173813/topics/ds-feeder-guardian:publish'
  : 'https://pubsub.googleapis.com/v1/projects/staging-199507/topics/ds-feeder-guardian:publish'

// const PUBSUB_ENDPOINT_PILOT = 'https://pubsub.googleapis.com/v1/projects/staging-199507/topics/dataflow-pilot:publish'

class Tracker {
  static sessionId = () => {
    let sessionId = _get(document, 'cookie', '')
      .trim()
      .split(';')
      .filter(function(item) {
        return item.indexOf('__sessionId=') >= 0
      })

    const sesssionIdVal = sessionId[0].split('=')[1]

    if (sessionId && sessionId.length > 0 && sesssionIdVal) {
      sessionId = sessionId[0].split('=')[1]
      document.cookie = `__sessionId=${sessionId}; max-age=${30 * 60}; path=/;`
    } else {
      sessionId =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15)
      document.cookie = `__sessionId=${sessionId}; max-age=${30 * 60}; path=/;`
    }
    return sessionId
  }

  static clientId = () => {
    let clientId = _get(document, 'cookie', '')
      .trim()
      .split(';')
      .filter(function(item) {
        return item.indexOf('__clientId=') >= 0
      })

    if (clientId && clientId.length > 0) {
      clientId = clientId[0].split('=')[1]
    } else {
      clientId =
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15) +
        Math.random()
          .toString(36)
          .substring(2, 15)
      document.cookie = `__clientId=${clientId}; max-age=${60 * 60 * 24 * 365 * 2}; path=/;`
    }
    return clientId
  }

  static getLangLat = () => {
    let latitude = '',
      longitude = ''
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
    let location = _get(document, 'cookie', '')
      .trim()
      .split(';')
      .filter(function(item) {
        return item.indexOf('__loc=') >= 0
      })
    if (location && location.length > 0) {
      location = location[0].split('=')[1]
    } else {
      location = localStorage.getItem('user-location')
      if (window.navigator.geolocation) {
        // console.log("MASUK SINI?")
        window.navigator.geolocation.getCurrentPosition(
          function(position) {
            latitude = position.coords.latitude
            longitude = position.coords.longitude
            location = `${latitude},${longitude}`
            // console.log(latitude);
            // console.log(longitude);
            document.cookie = `__loc=${location}; max-age=${60 * 60}; path=/;`
            localStorage.setItem('user-location', location)
          },
          function() {},
          options
        )
      }
    }
    // console.log("location", location)
    return location
  }

  static getOrCreateToken = async () => {
    // try to get pubsub token from cookie first
    let token = _get(document, 'cookie')
      .trim()
      .split(';')
      .filter(function(item) {
        return item.indexOf(`${cookieName}=`) >= 0
      })
    if (token.length > 0) {
      // if theres token return it
      token = token[0].split('=')[1]
    } else {
      // if there's no token request a new token
      token = await axios
        .post(TOKEN_ENDPOINT)
        .then(response => response.data)
        .then(data => {
          token = data.data.accessToken
          document.cookie = `${cookieName}=${token}; max-age=${60 * 60}; path=/;`
          return token
        })
        .catch(() => null)
    }
    return token
  }

  static sendPubSub = async (payload: Object, token: String) => {
    const keys = Object.keys(payload.data)
    const adjustedPayload = payload

    // Delete/unsend all missing/null values in payload.data
    keys.forEach(key => {
      if (!payload.data[key] || payload.data[key] === null || payload.data[key].length < 1 || payload.data[key][0] === null) {
        delete adjustedPayload.data[key]
      }
    })

    const postToDS = new Buffer(JSON.stringify(payload)).toString('base64')
    const reqBody = {
      messages: [
        {
          data: postToDS,
        },
      ],
    }

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(reqBody),
      url: PUBSUB_ENDPOINT,
    }

    // const options2 = {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     'Content-Type': 'application/json',
    //   },
    //   data: JSON.stringify(reqBody),
    //   url: PUBSUB_ENDPOINT_PILOT,
    // }
    axios(options).catch(() => {})
    // axios(options2).catch(() => {})

    return true
  }
}

export default Tracker
