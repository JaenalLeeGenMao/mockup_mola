import Mola from '@api/mola';
import types from '../constants';

export const updateToken = (location = "") => dispatch => {
  dispatch({
    type: types.UPDATE_USER_AUTH_LOADING,
    payload: {
      meta: {
        status: "loading",
        error: ''
      },
      data: {
        id: '',
        token: '',
        refreshToken: '',
        lang: 'en'
      }
    }
  });

  const apiCall = Mola.updateUserToken(location);

  if (apiCall.meta !== undefined) {
    dispatch({
      type: types.UPDATE_USER_AUTH_ERROR,
      payload: apiCall,
    });
  } else {
    return apiCall
      .then(result => {
        if (result.meta.status === "error") {
          dispatch({
            type: types.UPDATE_USER_AUTH_ERROR,
            payload: result,
          });
        }
        dispatch({
          type: types.UPDATE_USER_AUTH_SUCCESS,
          payload: result,
        });
      });
  }
}


export const getUserInfo = (token = "") => dispatch =>{

  const apiCall = Mola.getUserInfo(token);

  return apiCall
    .then(result => {
      console.log("INI DATANYA KAK ", result);
      if (result.meta.status === "success") {
        dispatch({
          type: types.GET_USER_INFO_SUCCESS,
          payload: result,
        });
      }
    });
}