/* eslint-disable import/prefer-default-export */
import * as home from './home';
import * as history from './history';
import * as video from './video';
import * as modal from './modal';

const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';
export default {
  SET_RUNTIME_VARIABLE,
  ...home,
  ...history,
  ...video,
  ...modal
};
