import { GET_HISTORY } from '../constants/history';
import Mola from '../api/mola';

export const getAllHistory = () => dispatch => {
  return Mola.getAllHistory()
    .then(result => {
      dispatch({
        type: GET_HISTORY,
        payload: result,
      });
    })
};

