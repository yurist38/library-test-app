import '@webcomponents/custom-elements';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js';

import App from './App';
import './components/BookCard';
import './components/BooksCarousel';
import './components/SearchButton';
import './components/SearchInput';

window.addEventListener('load', () => {
  const app = new App();
});
