/* eslint-disable import/prefer-default-export */
import { api } from '@source/config';
const { config } = api;

export const AUTH_BASE_ENDPOINT = `${config.endpoints.auth}`;
