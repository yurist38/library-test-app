import {
  ISearchAction,
  ISearchErrorAction,
  ISearchNotFoundAction,
  ISearchPayload,
  ISearchSuccessAction,
  ISearchSuccessPayload,
  SearchActions,
} from './types';

export const search = (payload: ISearchPayload): ISearchAction => ({
  payload,
  type: SearchActions.Search,
});

export const searchSuccess = (
  payload: ISearchSuccessPayload,
): ISearchSuccessAction => ({
  payload,
  type: SearchActions.SearchSuccess,
});

export const searchNotFound = (): ISearchNotFoundAction => ({
  type: SearchActions.SearchNotFound,
});

export const searchError = (): ISearchErrorAction => ({
  type: SearchActions.SearchError,
});
