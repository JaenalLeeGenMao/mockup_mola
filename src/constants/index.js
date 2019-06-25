/* eslint-disable import/prefer-default-export */
import * as home from './home'
import * as history from './history'
import * as search from './search'
import * as user from './user'
import * as movieDetail from './movie-detail'
import * as movieLibrary from './movie-library'
import * as movieStream from './movie-stream'
import * as notFound from './not-found'
import * as subscribe from './subscribe'
import * as sport from './sport'
import * as matches from './matches'
import * as vuid from './vuid'

const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE'
export default {
  SET_RUNTIME_VARIABLE,
  ...home,
  ...history,
  ...search,
  ...user,
  ...movieDetail,
  ...movieLibrary,
  ...movieStream,
  ...notFound,
  ...subscribe,
  ...sport,
  ...matches,
  ...vuid,
}
