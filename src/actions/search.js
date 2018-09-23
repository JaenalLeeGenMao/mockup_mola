import Mola from '../api/mola';
import types from '../constants';

export const getSearchResult = searchText => dispatch => {
  dispatch({
    type: types.GET_SEARCH_LOADING,
    payload: {
      meta: {
        status: "loading",
        error: ''
      },
      data: []
    }
  });
  return Mola.getSearchResult({ q: searchText })
    .then(result => {
      if (result.meta.status === "error") {
        dispatch({
          type: types.GET_SEARCH_ERROR,
          payload: result,
        });
      } else {
        dispatch({
          type: types.GET_SEARCH_SUCCESS,
          payload: result,
        });
      }
    });
};

export const getSearchGenre = () => dispatch => {
  dispatch({
    type: types.GET_SEARCH_GENRE_LOADING,
    payload: {
      meta: {
        status: "loading",
        error: ''
      },
      data: []
    }
  });
  return Mola.getSearchGenre()
    .then(result => {
      if (result.meta.status === "error") {
        dispatch({
          type: types.GET_SEARCH_GENRE_ERROR,
          payload: result,
        });
      } else {
        dispatch({
          type: types.GET_SEARCH_GENRE_SUCCESS,
          payload: result,
        });
      }
    });
};