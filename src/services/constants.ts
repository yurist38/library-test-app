import { IHttpOptions } from './types';

const headers = {
  Accept: 'application/json',
};

export const httpOptions: IHttpOptions = {
  baseUrl: 'https://openlibrary.org',
  headers,
};
