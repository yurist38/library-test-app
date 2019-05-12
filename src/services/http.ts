import { throwError } from 'rxjs';
import {
  ajax,
  AjaxRequest,
} from 'rxjs/ajax';
import {
  catchError,
  pluck,
} from 'rxjs/operators';

import { httpOptions } from './constants';
import { IHttpOptions } from './types';

class Http {
  private options: IHttpOptions;

  constructor(options: IHttpOptions) {
    this.options = options;
  }

  public get(uri: string) {
    const { baseUrl, headers } = this.options;

    const config: AjaxRequest = {
      crossDomain: true,
      headers,
      method: 'get',
      url: baseUrl + uri,
    };

    return ajax(config)
      .pipe(
        pluck('response', 'docs'),
        catchError(({ response }) => throwError(response)),
      );
  }
}

const http = new Http(httpOptions);

export default http;
