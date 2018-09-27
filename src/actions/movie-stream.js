import Mola from '../api/mola';
import types from '../constants';

export const getMovieStream = (id) => dispatch => {
  dispatch({
    type: types.GET_MOVIE_STREAM_LOADING,
    payload: {
      meta: {
        status: "loading",
        error: ''
      },
      data: []
    }
  });
  return Mola.getMovieStream({ id })
    .then(result => {
      if (result.meta.status === "error") {
        dispatch({
          type: types.GET_MOVIE_STREAM_ERROR,
          payload: result,
        });
      } else {
        dispatch({
          type: types.GET_MOVIE_STREAM_SUCCESS,
          payload: result,
        });
      }
    });
};