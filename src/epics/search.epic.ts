import {
  ActionsObservable,
  combineEpics,
  ofType,
} from 'redux-observable';
import { of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
} from 'rxjs/operators';

import {
  searchError,
  searchNotFound,
  searchSuccess,
} from '../actions/search.action';
import {
  ISearchAction,
  SearchActions,
} from '../actions/types';
import getSearchUri from '../helpers/getSearchUri';
import http from '../services/http';

const onSearch = (action$: ActionsObservable<ISearchAction>) => action$.pipe(
  ofType(SearchActions.Search),
  mergeMap(({ payload }) => http
    .get(getSearchUri(payload))
    .pipe(
      // TODO: change logic of handling results
      // For now just pick the first one from the list
      map(([ firstDoc ]) => {
        return firstDoc ? searchSuccess(firstDoc) : searchNotFound();
      }),
    ),
  ),
);

export default combineEpics(
  onSearch,
);
