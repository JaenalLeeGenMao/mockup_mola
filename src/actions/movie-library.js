import Mola from '../api/mola';
import types from '../constants';

export const getMovieLibrary = id => dispatch => {
  dispatch({
    type: types.GET_MOVIE_LIBRARY_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: ''
      },
      data: []
    }
  });
  return Mola.getMovieLibrary('').then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_MOVIE_LIBRARY_ERROR,
        payload: result
      });
    } else {
      dispatch({
        type: types.GET_MOVIE_LIBRARY_SUCCESS,
        payload: result
      });
    }
  });
};
