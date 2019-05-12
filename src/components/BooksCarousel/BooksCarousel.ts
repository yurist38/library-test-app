import { IBook } from '../../reducers/types';
import store from '../../store';
import BookCard from '../BookCard/BookCard';
import cardStyles from '../BookCard/styles';
import './styles';

class BooksCarousel extends HTMLElement {
  private books: IBook[];
  private slider: HTMLElement;
  private root: ShadowRoot;
  private container: HTMLElement;
  private size: number = 3;
  private firstActiveIndex: number = 0;
  private sliderInterval: NodeJS.Timeout | null = null;

  constructor() {
    super();
    const { recentBooks } = store.getState();
    this.books = recentBooks;
    this.appendChild(this.getHeader());

    this.slider = document.createElement('div');
    this.slider.classList.add('slider');
    this.appendChild(this.slider);

    this.root = this.slider.attachShadow({ mode: 'open' });
    this.root.innerHTML = `<style>${cardStyles}</style>`;
    this.container = document.createElement('div');
    this.container.classList.add('container');
    this.root.appendChild(this.container);

    this.renderBooks();
    this.renderArrows();
    this.runSlider();

    store.subscribe(this.updateBooks);
  }

  get header(): string {
    return this.getAttribute('header') || '';
  }

  public connectedCallback() {
    document.addEventListener('visibilitychange', this.onChangeVisibilityState);
  }

  private updateBooks = (): void => {
    const { recentBooks } = store.getState();

    if (this.books !== recentBooks) {
      this.books = recentBooks;
      this.renderBooks();
    }
  }

  private getHeader = (): HTMLElement => {
    const headerEl = document.createElement('h1');
    headerEl.innerText = this.header;

    return headerEl;
  }

  private renderBooks = (): void => {
    this.container.innerHTML = '';

    if (!this.books.length) {
      const messageEl = document.createElement('div');
      messageEl.classList.add('message');
      messageEl.innerText = 'Your search history is empty so far. Start searching books!';
      this.container.appendChild(messageEl);
      return;
    }

    this.getBooksToDisplay().forEach((book) => {
      this.container.appendChild(new BookCard(book));
    });
  }

  private renderArrows = () => {
    const leftArrow = document.createElement('span');
    leftArrow.innerText = '<';
    leftArrow.classList.add('arrow', 'left');
    leftArrow.addEventListener('click', this.slideLeft);
    this.root.appendChild(leftArrow);

    const rightArrow = document.createElement('span');
    rightArrow.innerText = '>';
    rightArrow.classList.add('arrow', 'right');
    rightArrow.addEventListener('click', this.slideRight);
    this.root.appendChild(rightArrow);
  }

  private slideRight = (): void => {
    if (this.books.length <= this.size) {
      return;
    }

    this.firstActiveIndex = this.firstActiveIndex + this.size +
      (this.books[this.firstActiveIndex + this.size] ? 0 : -this.books.length);

    this.container.style.transition = 'all .5s ease-in-out';
    this.container.style.left = '-200%';
    setTimeout(() => {
      Array.from(this.container.children)
        .slice(0, this.size)
        .forEach((node) => {
          node.remove();
        });
      this.container.style.transition = 'none';
      this.container.style.left = '-100%';
      this.getRightBooks().forEach((book) => {
        this.container.appendChild(new BookCard(book));
      });
    }, 500);
  }

  private slideLeft = (): void => {
    if (this.books.length <= this.size) {
      return;
    }

    this.firstActiveIndex = this.firstActiveIndex - this.size +
      (this.books[this.firstActiveIndex - this.size] ? 0 : this.books.length);

    this.container.style.transition = 'all .5s ease-in-out';
    this.container.style.left = '0';
    setTimeout(() => {
      Array.from(this.container.children)
        .slice(this.size, this.size * 2)
        .forEach((node) => {
          node.remove();
        });
      this.container.style.transition = 'none';
      this.container.style.left = '-100%';
      this.getLeftBooks().reverse().forEach((book) => {
        this.container.insertBefore(new BookCard(book), this.container.children[0]);
      });
    }, 500);
  }

  private getBooksToDisplay(): IBook[] {
    if (this.books.length <= this.size) {
      return this.books;
    }

    return [
      ...this.books,
      ...this.books,
      ...this.books,
    ].slice(
      this.books.length + this.firstActiveIndex - this.size,
      this.books.length + this.firstActiveIndex + 2 * this.size,
    );
  }

  private getRightBooks(): IBook[] {
    return this.books
      .concat(this.books)
      .slice(this.firstActiveIndex, this.firstActiveIndex + this.size);
  }

  private getLeftBooks(): IBook[] {
    return this.books
      .concat(this.books)
      .slice(
        this.firstActiveIndex + this.books.length - this.size,
        this.firstActiveIndex + this.books.length,
      );
  }

  private runSlider() {
    this.sliderInterval = setInterval(this.slideRight, 5000);
  }

  private onChangeVisibilityState = (event: Event) => {
    if (document.visibilityState === 'visible') {
      this.runSlider();
    } else {
      // @ts-ignore
      clearInterval(this.sliderInterval);
    }
  }
}

export default BooksCarousel;

customElements.define('books-carousel', BooksCarousel);
