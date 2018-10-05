import axios from 'axios';
import _get from 'lodash/get';

const production = process.env.NODE_ENV === 'production';
const cookieName = production ? '_pst' : '_pst_staging';

const TOKEN_ENDPOINT = production
  ? 'https://api-g.supersoccer.tv/v1/videos/pubsub'
  : 'https://api.supersabar.com/v1/videos/pubsub';

const PUBSUB_ENDPOINT = production
  ? 'https://pubsub.googleapis.com/v1/projects/supersoccer-173813/topics/ds-feeder-guardian:publish'
  : 'https://pubsub.googleapis.com/v1/projects/staging-199507/topics/ds-feeder-guardian:publish';

class Tracker {
  static sessionId = () => {
    let sessionId = _get(document, 'cookie', '')
      .trim()
      .split(';')
      .filter(function(item) {
        return item.indexOf('__sessId=') >= 0;
      });

    if (sessionId && sessionId.length) {
      sessionId = sessionId[0].split('=')[1];
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
          .substring(2, 15);
      document.cookie = `__sessId=${sessionId}; max-age=${60 * 60 * 24}; path=/;`;
    }
    return sessionId;
  };

  static getOrCreateToken = async () => {
    // let token = window.Cookies.get(cookieName);
    let token = _get(document, 'cookie')
      .trim()
      .split(';')
      .filter(function(item) {
        return item.indexOf(`${cookieName}=`) >= 0;
      });
    if (token.length > 0) {
      token = token[0].split('=')[1];
    } else {
      token = null;
    }

    if (!token) {
      token = await axios
        .post(TOKEN_ENDPOINT)
        .then(response => response.data)
        .then(data => {
          token = data.access_token;
          document.cookie = `${cookieName}=${token}; max-age=${60 * 60}; path=/;`;
          return token;
        })
        .catch(() => null);
    }
    return token;
  };

  static sendPubSub = async (payload: Object, token: String) => {
    const keys = Object.keys(payload.data);
    const adjustedPayload = payload;

    // Delete/unsend all missing/null values in payload.data
    keys.forEach(key => {
      if (
        !payload.data[key] ||
        payload.data[key] === null ||
        payload.data[key].length < 1 ||
        payload.data[key][0] === null
      ) {
        delete adjustedPayload.data[key];
      }
    });

    const postToDS = new Buffer(JSON.stringify(payload)).toString('base64');
    const reqBody = {
      messages: [
        {
          data: postToDS
        }
      ]
    };

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(reqBody),
      url: PUBSUB_ENDPOINT
    };
    return axios(options).catch(() => {});
  };
}

export default Tracker;
