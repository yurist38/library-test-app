export enum SearchActions {
  Search = 'SEARCH',
  SearchSuccess = 'SEARCH/SUCCESS',
  SearchNotFound = 'SEARCH/NOT_FOUND',
  SearchError = 'SEARCH/ERROR',
}

export enum StatusActions {
  SetSearchingText = 'STATUS/SET_SEARCHING_TEXT',
}

export type IStatusSetSearchingTextPayload = string;

export interface IStatusSetSearchingTextAction {
  type: StatusActions | SearchActions;
  payload: IStatusSetSearchingTextPayload;
}

export type ISearchPayload = string;

export interface ISearchAction {
  type: SearchActions.Search;
  payload: ISearchPayload;
}

export interface ISearchSuccessPayload {
  title: string;
  author_name: string[];
  cover_i: string;
}

export interface ISearchSuccessAction {
  type: SearchActions.SearchSuccess;
  payload: ISearchSuccessPayload;
}

export interface ISearchNotFoundAction {
  type: SearchActions.SearchNotFound;
}

export interface ISearchErrorAction {
  type: SearchActions.SearchError;
}
