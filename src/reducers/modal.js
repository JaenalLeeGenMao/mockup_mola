import types from '../constants';

const initialState = {
  modalType: null,
  modalProps: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
  case types.SHOW_MODAL:
  console.log("MASUK");
    return {
      modalProps: action.modalProps,
      modalType: action.modalType,
      type: action.type
    }
  case types.HIDE_MODAL:
    return initialState
  default:
    return state
  }
}