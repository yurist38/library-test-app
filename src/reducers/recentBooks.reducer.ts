import {
  ISearchSuccessAction,
  SearchActions,
} from '../actions/types';
import storage from '../services/webstorage';
import {
  IBook,
  IBookCover,
} from './types';

const booksStorageKey = 'recentBooks';

export const initialState: IBook[] = storage.get(booksStorageKey) || [];

const recentBooksReducer = (
  state: IBook[] = initialState,
  action: ISearchSuccessAction,
) => {
  switch (action.type) {
    case (SearchActions.SearchSuccess): {
      const { author_name, cover_i, title } = action.payload;

      const cover: IBookCover = {
        large: `http://covers.openlibrary.org/b/id/${cover_i}-L.jpg`,
        medium: `http://covers.openlibrary.org/b/id/${cover_i}-M.jpg`,
        small: `http://covers.openlibrary.org/b/id/${cover_i}-S.jpg`,
      };

      const newState: IBook[] = [
        ...state,
        {
          authors: [...author_name],
          cover,
          loadedAt: Date.now(),
          title,
        },
      ];

      storage.set(booksStorageKey, newState);

      return newState;
    }
    default:
      return state;
  }
};

export default recentBooksReducer;
