export interface IBook {
  title: string;
  authors: string[];
  cover: IBookCover;
  loadedAt: number;
}

export type ICoverSize = 'small' | 'medium' | 'large';

export type IBookCover = {
  [size in ICoverSize]: string;
};

export interface IStatus {
  isSearching: boolean;
  searchingText: string;
}
