import { FETCH_HISTORY } from '../constants';
import axios from 'axios';

const apiUrl = 'http://mola.lukitomo.com/v2/videos/tt1179056';
// const apiUrl = 'http://mola.lukitomo.com/v2/userdata/kareemlukitomo123/videos/histories';

export const fetchHistory = movies => ({
  type: FETCH_HISTORY,
  result: movies,
});

export const fetchAllHistory = () => dispatch =>
  axios
    .get(apiUrl)
    .then(response => {
      dispatch(fetchHistory(response.data));
    })
    .catch(error => {
      console.log('error', error);
      // throw(error);
    });
