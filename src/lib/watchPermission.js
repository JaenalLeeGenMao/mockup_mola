export default (permission = 0, sid = '') => {
  let isAllowed = true
  let errorCode = ''
  if (permission == 1 && sid.length == 0) {
    // user have to login and subscribe
  } else if (permission == 2 && sid.length == 0) {
    //user have to login
    isAllowed = false
    errorCode = 'login_first'
  }
  return {
    isAllowed,
    errorCode,
  }
}
