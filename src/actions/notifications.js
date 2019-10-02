import types from '../constants'
import Mola from '../api/mola'

export const getTotalNotifications = () => dispatch => {
  dispatch({
    type: types.GET_TOTAL_NOTIFICATIONS_LOADING,
    payload: {
      total: {
        meta: {
          status: 'loading',
          error: '',
        },
      },
    },
  })
  return Mola.getTotalNotifications()
    .then(result => {
      if (result.meta.status === 'error') {
        dispatch({
          type: types.GET_TOTAL_NOTIFICATIONS_ERROR,
          payload: {
            total: {
              meta: {
                status: 'error',
                error: result.meta.error,
              },
            },
          },
        })
      } else {
        dispatch({
          type: types.GET_TOTAL_NOTIFICATIONS_SUCCESS,
          payload: {
            total: {
              meta: {
                status: 'success',
                error: '',
              },
              data: result.data,
            },
          },
        })
      }
    })
    .catch(err => {
      dispatch({
        type: types.GET_TOTAL_NOTIFICATIONS_ERROR,
        payload: {
          total: {
            meta: {
              status: 'error',
              error: err,
            },
          },
        },
      })
    })
}

export const getNotifications = (limit = 5) => (dispatch, getState) => {
  // let currentNotifData = []
  // let localStorageNotifData = JSON.parse(window.localStorage.getItem('n_id'))
  // console.log(localStorageNotifData, 'getItem')
  // if (localStorageNotifData) {
  //   console.log(localStorageNotifData, 'ls')
  //   currentNotifData = localStorageNotifData
  //   currentNotifData.map(cr => {
  //     cr.new = false
  //   })
  // }
  // console.log(currentNotifData, 'after map')
  dispatch({
    type: types.GET_NOTIFICATIONS_LOADING,
    payload: {
      meta: {
        status: 'loading',
        error: '',
      },
    },
  })
  return Mola.getNotifications(limit)
    .then(result => {
      if (result.meta.status === 'error') {
        dispatch({
          type: types.GET_NOTIFICATIONS_ERROR,
          payload: {
            meta: {
              status: 'error',
              error: result.meta.error,
            },
          },
        })
      } else if (result.meta.status === 'success') {
        const prevData = getState().notifications.data
        const total = getState().notifications.total.data
        if (!result.data || result.data.length <= 0) {
          dispatch({
            type: types.GET_NOTIFICATIONS_SUCCESS,
            payload: {
              meta: {
                status: 'success',
                error: '',
              },
              data: [],
            },
          })
        } else {
          let isMore = false
          // let dataSliced = result.data
          // if (result.data.length > size) {
          //   const updateStatus = getState().notifications.update.status
          //   if (updateStatus === 'success' || updateStatus === 'error') {
          //     isMore = getState().notifications.isMore
          //   } else {
          //     isMore = true
          //     dataSliced = result.data.slice(0, size)
          //   }
          // }

          if (prevData.length === 0) {
            if (result.data.length < total) {
              isMore = true
            }
            dispatch({
              type: types.GET_NOTIFICATIONS_SUCCESS,
              payload: {
                meta: {
                  status: 'success',
                  error: '',
                },
                data: result.data,
                isMore: isMore,
              },
            })
          } else {
            let newNotif = false
            let newNotifData = []
            const prevDataId = prevData.map(pd => pd.id)

            result.data.map(nextDataNotif => {
              if (prevDataId.indexOf(nextDataNotif.id) < 0) {
                newNotif = true
                newNotifData.push(nextDataNotif)
              }
            })

            if (newNotif) {
              const newData = [...newNotifData, ...prevData]
              if (newData.length < total) {
                isMore = true
              }
              dispatch({
                type: types.GET_NOTIFICATIONS_SUCCESS,
                payload: {
                  meta: {
                    status: 'success',
                    error: '',
                  },
                  data: [...newNotifData, ...prevData],
                  isMore: isMore,
                },
              })
            } else {
              if (prevData.length < total) {
                isMore = true
              }
              dispatch({
                type: types.GET_NOTIFICATIONS_SUCCESS,
                payload: {
                  meta: {
                    status: 'success',
                    error: '',
                  },
                  data: [...prevData],
                  isMore: isMore,
                },
              })
            }
          }
        }
      }
    })
    .catch(err => {
      dispatch({
        type: types.GET_NOTIFICATIONS_ERROR,
        payload: {
          meta: {
            status: 'error',
            error: err,
          },
        },
      })
    })
}

export const updateNotifications = (limit = 5, time = '') => (dispatch, getState) => {
  // let localStorageNotifData = JSON.parse(window.localStorage.getItem('n_id'))
  dispatch({
    type: types.UPDATE_NOTIFICATIONS_LOADING,
    payload: {
      update: {
        status: 'loading',
        error: '',
      },
    },
  })
  return Mola.getNotifications(limit, time)
    .then(result => {
      if (result.meta.status === 'error') {
        dispatch({
          type: types.UPDATE_NOTIFICATIONS_ERROR,
          payload: {
            update: {
              status: 'error',
              error: result.meta.error,
            },
          },
        })
      }
      const { data } = getState().notifications.total
      const { total } = data
      if (result.data) {
        // console.log(result.data, 'rersult')
        // let slicedData = []
        let isMore = false
        // if (result.data.length > size) {
        //   slicedData = result.data.slice(0, size)
        //   isMore = true
        // } else {
        //   slicedData = result.data
        // }
        // const notiflocalid = localStorageNotifData.map(ls => {
        //   return ls.id
        // })
        // let notifLocalUpdate = []
        // const dataConcat = [...getState().notifications.data, ...slicedData]
        // console.log(slicedData)
        // dataConcat.map(n => {
        //   if (notiflocalid.indexOf(n.id) >= 0) {
        //     notifLocalUpdate.push({
        //       id: n.id,
        //       new: false,
        //     })
        //   } else {
        //     notifLocalUpdate.push({
        //       id: n.id,
        //       new: true,
        //     })
        //   }
        // })
        // let newStorageData = [...notifLocalUpdate]
        const currentData = getState().notifications.data
        const updateData = [...currentData, ...result.data]
        if (updateData.length < total) {
          isMore = true
        }
        // window.localStorage.setItem('n_id', JSON.stringify(newStorageData))
        dispatch({
          type: types.UPDATE_NOTIFICATIONS_SUCCESS,
          payload: {
            update: {
              status: 'success',
              error: '',
            },
            data: updateData,
            isMore: isMore,
          },
        })
      }
    })
    .catch(err => {
      dispatch({
        type: types.UPDATE_NOTIFICATIONS_ERROR,
        payload: {
          update: {
            status: 'error',
            error: err,
          },
        },
      })
    })
}

export const showPopupNotifications = () => dispatch => {
  dispatch({
    type: types.TOGGLE_POPUP_NOTIFICATIONS,
    payload: {
      showPopupNotifications: true,
    },
  })
}

export const hidePopupNotifications = () => dispatch => {
  dispatch({
    type: types.TOGGLE_POPUP_NOTIFICATIONS,
    payload: {
      showPopupNotifications: false,
    },
  })
}

export default {
  getNotifications,
  getTotalNotifications,
  updateNotifications,
  showPopupNotifications,
  hidePopupNotifications,
}
