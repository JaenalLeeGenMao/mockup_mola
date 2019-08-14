import _get from 'lodash/get'
import Crypto from 'crypto.js'

class DRMConfig {
  static getOrCreateDeviceId = () => {
    // try to get pubsub token from cookie first
    let deviceId = _get(document, 'cookie')
      .trim()
      .split(';')
      .filter(function(item) {
        return item.indexOf('__deviceId=') >= 0
      })
    if (deviceId.length > 0) {
      // if theres deviceId return it
      deviceId = deviceId[0].split('=')[1]
    } else {
      // if there's no deviceId request a new deviceId
      deviceId = Crypto.uuid()
      document.cookie = `__deviceId=${deviceId}; max-age=${30 * 24 * 3600}; path=/;`
    }
    return deviceId
  }

  static getVUID = () => {
    // try to get pubsub token from cookie first
    let vuid = _get(document, 'cookie')
      .trim()
      .split(';')
      .filter(function(item) {
        return item.indexOf('__VUID=') >= 0
      })
    if (vuid.length > 0) {
      // if theres vuid return it
      vuid = vuid[0].split('=')[1]
    } else {
      vuid = ''
    }
    return vuid
  }

  static setVUID = vuid => {
    // if (vuid) {
    document.cookie = `__VUID=${vuid}; max-age=${30 * 24 * 3600}; path=/;`
    // }
  }
}

export default DRMConfig
