import Mola from '../api/mola';
import types from '../constants';
import searchDb from '../database/searchDb';

export const getSearchResult = searchText => dispatch => {
  dispatch({
    type: types.GET_SEARCH_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: ''
      },
      data: []
    }
  });
  var isExist = false;
  var cacheResult = {
    meta: {
      status: 'success'
    },
    data: []
  };
  searchDb
    .transaction('r', searchDb.moviesResult, searchDb.searchKeyword, async () => {
      //check on cache IndexedDB if keyword and search result exists
      await searchDb.searchKeyword
        .where('keyword')
        .equalsIgnoreCase(searchText)
        .each(function(res) {
          isExist = true; //if exist
          console.log('MASUK AMBIL CACHE');
          const movieIdArr = res.movieId.split(',');
          movieIdArr.map(id => {
            searchDb.moviesResult
              .where('movieId')
              .equalsIgnoreCase(id)
              .each(function(res) {
                cacheResult.data.push({
                  id: res.movieId,
                  type: res.type,
                  title: res.title,
                  year: res.year,
                  coverUrl: res.coverUrl
                });
              });
          });
        });
    })
    .then(() => {
      if (!isExist) {
        //if keyword not exist in cache indexed DB then get from api and store in cache
        return Mola.getSearchResult({ q: searchText }).then(result => {
          if (result.meta.status === 'error') {
            dispatch({
              type: types.GET_SEARCH_ERROR,
              payload: result
            });
          } else {
            console.log('MASUK AMBIL API');
            dispatch({
              type: types.GET_SEARCH_SUCCESS,
              payload: result
            });

            var movieIdAdded = [];
            searchDb.transaction('rw', searchDb.moviesResult, searchDb.searchKeyword, async () => {
              //loop result from api to store to cache db
              // result.data.map(async (dt)=> {
              for (const dt of result.data) {
                // console.log("Dt", dt)
                var isMovieIdExist = false;
                //check if movieid already exist in cache db so prevent duplication
                await searchDb.moviesResult
                  .where('movieId')
                  .equals(dt.id)
                  .count(function(cnt) {
                    isMovieIdExist = cnt > 0;
                  })
                  .then(() => {
                    // console.log("EXIST ", isMovieIdExist)
                    if (!isMovieIdExist) {
                      //if not exist then store
                      searchDb.moviesResult.add({
                        movieId: dt.id,
                        type: dt.type,
                        title: dt.title,
                        year: dt.year,
                        coverUrl: dt.coverUrl
                      });
                      // console.log("movieIdAdded",movieIdAdded)
                    }
                  });
                movieIdAdded.push(dt.id);
              }
              // });
              searchDb.searchKeyword.add({ keyword: searchText, movieId: movieIdAdded.join(',') });
            });
          }
        });
      } else {
        // console.log("MASUK AMBIL CACHE", cacheResult)
        dispatch({
          type: types.GET_SEARCH_SUCCESS,
          payload: cacheResult
        });
      }
    });
};

export const getSearchGenre = () => dispatch => {
  dispatch({
    type: types.GET_SEARCH_GENRE_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: ''
      },
      data: []
    }
  });
  return Mola.getSearchGenre().then(result => {
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_SEARCH_GENRE_ERROR,
        payload: result
      });
    } else {
      dispatch({
        type: types.GET_SEARCH_GENRE_SUCCESS,
        payload: result
      });
    }
  });
};

export const getRecentSearch = () => dispatch => {
  dispatch({
    type: types.GET_RECENT_SEARCH_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: ''
      },
      data: []
    }
  });
  return Mola.getRecentSearch().then(result => {
    console.log('RESULT REC', result);
    if (result.meta.status === 'error') {
      dispatch({
        type: types.GET_RECENT_SEARCH_ERROR,
        payload: result
      });
    } else {
      dispatch({
        type: types.GET_RECENT_SEARCH_SUCCESS,
        payload: result
      });
    }
  });
};
