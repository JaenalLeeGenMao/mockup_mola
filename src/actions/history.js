import { GET_HISTORY } from '../constants/history';
import axios from 'axios';

const apiUrl = 'http://mola.lukitomo.com/v2/videos/tt1179056';
// const apiUrl = 'http://mola.lukitomo.com/v2/userdata/kareemlukitomo123/videos/histories';

export const getVideoHistory = movies => ({
  type: GET_HISTORY,
  result: movies,
});

export const getAllHistory = () => dispatch =>
  axios
    .get(apiUrl)
    .then(response => {
      dispatch(getVideoHistory(response.data));
    })
    .catch(error => {
      console.log('error', error);
      // throw(error);
    });
