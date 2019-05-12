import { combineReducers } from 'redux';

import recentBooks from './recentBooks.reducer';
import status from './status.reducer';
import { IBook } from './types';

export interface IRootState {
  recentBooks: IBook[];
}

const rootReducer = combineReducers({
  recentBooks,
  status,
});

export default rootReducer;
