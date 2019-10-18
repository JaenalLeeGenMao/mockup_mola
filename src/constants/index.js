/* eslint-disable import/prefer-default-export */
import * as home from './home'
import * as history from './history'
import * as search from './search'
import * as user from './user'
import * as movieDetail from './movie-detail'
import * as recommendation from './recommendation'
// import * as subscribe from './subscribe'
import * as matches from './matches'
import * as vuid from './vuid'
import * as channels from './channels'
import * as feature from './feature'
import * as playlist from './playlist'
import * as partners from './partners'
import * as notifications from './notifications'
import * as articlesDetail from './articles'

const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE'
export default {
  SET_RUNTIME_VARIABLE,
  ...home,
  ...history,
  ...search,
  ...user,
  ...movieDetail,
  ...recommendation,
  // ...subscribe,
  ...matches,
  ...vuid,
  ...channels,
  ...feature,
  ...playlist,
  ...partners,
  ...notifications,
  ...articlesDetail,
}
