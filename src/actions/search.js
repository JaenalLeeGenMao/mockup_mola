import Mola from '../api/mola';
import types from '../constants';

export const getSearchVideo = () => dispatch => {
  dispatch({
    type: types.GET_VIDEOS_LOADING,
    payload: {
      meta: {
        status: "loading",
        error: ''
      },
      data: []
    }
  });
  return Mola.getSearchVideo()
    .then(result => {
      if (result.meta.status === "error") {
        dispatch({
          type: types.GET_VIDEOS_ERROR,
          payload: result,
        });
      } else {
        dispatch({
          type: types.GET_VIDEOS_SUCCESS,
          payload: result,
        });
      }
    });
};

// export const getSearchResult = searchText => dispatch => {
//   return Mola.getSearchResult({ searchText: searchText })
//     .then(result => {
//       result = {
//         meta: {
//           status: "success",
//         },
//         data: result
//       };
//       dispatch({
//         type: types.GET_SEARCH,
//         payload: result,
//       });
//     });
// };

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