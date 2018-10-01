import Mola from '../api/mola';
import types from '../constants';
import searchDb from '../database/searchDb';

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
      console.log("MASUK search", searchText)
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
  var isExist = false;
  var cacheResult = [];
  searchDb.searchKeyword.where("keyword").equalsIgnoreCase("bbb").each(function (res) {
    isExist = true;
    cacheResult.push({ id: res.movieId, type: res.type, title: res.title, year: res.year, coverUrl: res.coverUrl })

  }).catch(function (error) {
    console.log("Error dixie",error);
  });

  searchDb.table('searchKeyword')
    .add({ keyword: 'AAA', movieId: '001,002' });
  if(!isExist) {
    return Mola.getSearchGenre()
      .then(result => {
        if (result.meta.status === "error") {
          dispatch({
            type: types.GET_SEARCH_GENRE_ERROR,
            payload: result
          });
        } else {
          dispatch({
            type: types.GET_SEARCH_GENRE_SUCCESS,
            payload: result,
          });
          console.log("Result", result)
          var movieIdAdded = [];
          result.map((dt)=> {
            db.table('moviesResult')
              .add({ id: dt.movieId, type: dt.type, title: dt.title, year: dt.year, coverUrl: dt.coverUrl  })
              .then((id) => {
                movieIdAdded.push(id);
              });
          });

          db.table('searchKeyword')
            .add({ id: searchText, movieId:  movieIdAdded.join(',') })
        }
      });
  } else {
    dispatch({
      type: types.GET_SEARCH_GENRE_SUCCESS,
      payload: result,
    });
  }
};