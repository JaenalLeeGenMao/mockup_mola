import types from '../constants';

// export default function searchVideo(state = {}, action) {
//   switch (action.type) {
//   case types.GET_VIDEOS_LOADING:
//     return { ...state, videos: { ...action.payload } };
//   case types.GET_VIDEOS_SUCCESS:
//     return { ...state, videos: { ...action.payload } };
//   case types.GET_VIDEOS_ERROR:
//     return { ...state, videos: { ...action.payload } };
//   default:
//     return {
//       ...state,
//       videos: {
//         meta: {
//           status: "loading"
//         },
//         data: []
//       }
//     };
//   }
// };

export default function searchResult(state = {}, action) {
  switch (action.type) {
  case types.GET_SEARCH_LOADING:
    return { ...state, result: { ...action.payload } };
  case types.GET_SEARCH_SUCCESS:
    return { ...state, result: { ...action.payload } };
  case types.GET_SEARCH_ERROR:
    return { ...state, result: { ...action.payload } };
  default:
    return {
      ...state,
      result: {
        meta: {
          status: "loading"
        },
        data: []
      }
    };
  }
};