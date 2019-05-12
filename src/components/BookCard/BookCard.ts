import { format } from 'timeago.js';
import { IBook, ICoverSize } from '../../reducers/types';

class BookCard extends HTMLElement {
  public book: IBook;

  constructor(book: IBook) {
    super();
    this.book = book;
    this.renderCover();
    this.renderTitle();
    this.renderAuthor();
    this.renderTime();
  }

  private renderCover(): void {
    const coverEl = document.createElement('img');
    coverEl.src = this.book.cover[this.getCoverSize()];
    this.appendChild(coverEl);
  }

  private renderTitle(): void {
    const titleEl = document.createElement('div');
    titleEl.classList.add('text');
    titleEl.innerHTML = `<span>Title:</span> ${this.book.title}`;
    this.appendChild(titleEl);
  }

  private renderAuthor(): void {
    const authorEl = document.createElement('div');
    authorEl.classList.add('text');
    authorEl.innerHTML = `<span>Author(s):</span> ${this.book.authors.join(', ')}`;
    this.appendChild(authorEl);
  }

  private getTimeString(): string {
    const time = format(this.book.loadedAt, navigator.language);
    return `<span>Loaded:</span> ${time}`;
  }

  private renderTime(): void {
    const authorEl = document.createElement('div');
    authorEl.classList.add('time');
    authorEl.innerHTML = this.getTimeString();
    this.appendChild(authorEl);

    setInterval(() => {
      authorEl.innerHTML = this.getTimeString();
    }, 15000);
  }

  private getCoverSize = (): ICoverSize => {
    const imageWidth = Math.floor(window.innerWidth * 0.8 / 3.3);

    if (imageWidth > 300) {
      return 'large';
    }

    if (imageWidth > 120) {
      return 'medium';
    }

    return 'small';
  }
}

export default BookCard;

customElements.define('book-card', BookCard);
