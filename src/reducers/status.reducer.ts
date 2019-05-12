import {
  IStatusSetSearchingTextAction,
  SearchActions,
  StatusActions,
} from '../actions/types';
import { IStatus } from './types';

export const initialState: IStatus = {
  isSearching: false,
  searchingText: '',
};

const statusReducer = (
  state: IStatus = initialState,
  action: IStatusSetSearchingTextAction,
) => {
  switch (action.type) {
    case (StatusActions.SetSearchingText):
      return {
        ...state,
        searchingText: action.payload,
      };
    case (SearchActions.Search):
      return {
        ...state,
        isSearching: true,
      };
    case (SearchActions.SearchSuccess):
    case (SearchActions.SearchNotFound):
      return {
        ...state,
        isSearching: false,
      };
    default:
      return state;
  }
};

export default statusReducer;
