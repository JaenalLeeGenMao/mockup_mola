/* eslint-disable import/prefer-default-export */
import * as home from './home';

const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';
export default {
    SET_RUNTIME_VARIABLE,
    ...home
};
