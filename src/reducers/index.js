import { combineReducers } from 'redux'
import user from './user'
import runtime from './runtime'
import home from './home'
import history from './history'
import search from './search'
import movieDetail from './movie-detail'
import recommendation from './recommendation'
// import subscribe from './subscribe'
import { reducer as toastr } from 'react-redux-toastr'
import matches from './matches'
import vuid from './vuid'
import channelsPlaylist from './channels-playlist'
import programmeGuides from './program-guides'
import feature from './feature'
import playlist from './playlist'
import headerMenu from './header-menu'
import configParams from './config-params'
import partnerRedeem from './partner-redeem'
import partners from './partners'
import notifications from './notifications'
import articlesDetail from './articles'
// import { getReducer } from '../../../gandalf';
// import { getReducer } from 'gandalf';
// const { user, runtime, home, history, search, movieDetail, movieLibrary, movieStream, toastr } = getReducer();

export default combineReducers({
  user,
  runtime,
  home,
  history,
  search,
  movieDetail,
  toastr,
  recommendation,
  // subscribe,
  matches,
  vuid,
  channelsPlaylist,
  programmeGuides,
  feature,
  playlist,
  headerMenu,
  configParams,
  partners,
  notifications,
  articlesDetail,
  partnerRedeem,
})
