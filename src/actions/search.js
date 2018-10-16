import Mola from '../api/mola';
import types from '../constants';
import searchDb from '../database/searchDb';
import Dexie from 'dexie';

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
  Dexie.exists('mola-search-cache-database').then(function(exists) {
    if (exists) {
      searchDb
        .transaction(
          'r',
          searchDb.moviesResult,
          searchDb.castsResult,
          searchDb.searchKeyword,
          async () => {
            //check on cache IndexedDB if keyword and search result exists
            await searchDb.searchKeyword
              .where('keyword')
              .equalsIgnoreCase(searchText)
              .each(function(res) {
                isExist = true; //if exist
                if (res.movieId) {
                  const movieIdArr = res.movieId.split(',');
                  movieIdArr.map(id => {
                    searchDb.moviesResult
                      .where('movieId')
                      .equals(id)
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
                }
                if (res.castId) {
                  const castIdArr = res.castId.split(',');
                  castIdArr.map(id => {
                    searchDb.castsResult
                      .where('castId')
                      .equals(id)
                      .each(function(res) {
                        cacheResult.data.push({
                          id: res.castId,
                          type: res.type,
                          name: res.name,
                          imageUrl: res.imageUrl
                        });
                      });
                  });
                }
              });
          }
        )
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
                dispatch({
                  type: types.GET_SEARCH_SUCCESS,
                  payload: result
                });

                var curDate = new Date();

                var createdDate =
                  curDate.getFullYear() +
                  '-' +
                  ('0' + (curDate.getMonth() + 1)).slice(-2) +
                  '-' +
                  ('0' + curDate.getDate()).slice(-2) +
                  ' 00:00:00';

                var movieIdAdded = [];
                var castIdAdded = [];
                searchDb.transaction(
                  'rw',
                  searchDb.moviesResult,
                  searchDb.castsResult,
                  searchDb.searchKeyword,
                  async () => {
                    //loop result from api to store to cache db
                    for (const dt of result.data) {
                      var isMovieIdExist = false;
                      var isCastIdExist = false;

                      //check type to store to related table
                      if (dt.type == 'videos') {
                        //check if movieid already exist in cache db so prevent duplication
                        await searchDb.moviesResult
                          .where('movieId')
                          .equals(dt.id)
                          .count(function(cnt) {
                            isMovieIdExist = cnt > 0;
                          })
                          .then(() => {
                            if (!isMovieIdExist) {
                              //if not exist then store
                              searchDb.moviesResult.add({
                                movieId: dt.id,
                                type: dt.type,
                                title: dt.title,
                                year: dt.year,
                                coverUrl: dt.coverUrl,
                                createdDate: createdDate
                              });
                            }
                          });
                        movieIdAdded.push(dt.id);
                      } else {
                        //check if castId already exist in cache db so prevent duplication
                        await searchDb.castsResult
                          .where('castId')
                          .equals(dt.id)
                          .count(function(cnt) {
                            isCastIdExist = cnt > 0;
                          })
                          .then(() => {
                            if (!isCastIdExist) {
                              //if not exist then store
                              searchDb.castsResult.add({
                                type: dt.type,
                                castId: dt.id,
                                name: dt.name,
                                imageUrl: dt.imageUrl,
                                createdDate: createdDate
                              });
                            }
                          });
                        castIdAdded.push(dt.id);
                      }
                    }

                    searchDb.searchKeyword.add({
                      keyword: searchText,
                      movieId: movieIdAdded.join(','),
                      castId: castIdAdded.join(','),
                      createdDate: createdDate
                    });
                  }
                );
              }
            });
          } else {
            if (cacheResult.data.length > 0) {
              dispatch({
                type: types.GET_SEARCH_SUCCESS,
                payload: cacheResult
              });
            } else {
              dispatch({
                type: types.GET_SEARCH_NO_RESULT,
                payload: cacheResult
              });
            }
          }
        });
    } else {
      return Mola.getSearchResult({ q: searchText }).then(result => {
        if (result.meta.status === 'error') {
          dispatch({
            type: types.GET_SEARCH_ERROR,
            payload: result
          });
        } else {
          dispatch({
            type: types.GET_SEARCH_SUCCESS,
            payload: result
          });
        }
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

export const getRecentSearch = (sessionId, sid) => dispatch => {
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
  return Mola.getRecentSearch(sessionId, sid).then(result => {
    console.log('MAKSKS');
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
