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
  return Mola.getMovieLibrary(id).then(result => {
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

export const getMovieLibraryList = () => dispatch => {
  dispatch({
    type: types.GET_MOVIE_LIBRARY_LIST_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: ''
      },
      data: []
    }
  });
  return Mola.getMovieLibraryList().then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_MOVIE_LIBRARY_LIST_ERROR,
        payload: result
      });
    } else {
      dispatch({
        type: types.GET_MOVIE_LIBRARY_LIST_SUCCESS,
        payload: result
      });
    }
  });
};
