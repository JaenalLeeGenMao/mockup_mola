import * as endpoints from './endpoints';
import handler from './handler';

export default {
  ...handler,
  ...endpoints
};
