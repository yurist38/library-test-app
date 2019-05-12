import { search } from '../../actions/search.action';
import store from '../../store';
import './styles';

class SearchButton extends HTMLElement {
  public buttonElement: HTMLButtonElement;

  constructor() {
    super();

    this.buttonElement = document.createElement('button');
    this.update();
    store.subscribe(this.update);

    this.render();
  }

  get text() {
    return this.getAttribute('text') || '';
  }

  get disabled(): boolean {
    return !!this.getAttribute('disabled');
  }

  public connectedCallback() {
    this.buttonElement.addEventListener('click', this.onClick);
  }

  public disconnectedCallback() {
    this.buttonElement.removeEventListener('click', this.onClick);
  }

  public onClick = (event: MouseEvent) => {
    const { dispatch } = store;
    const { status } = store.getState();
    dispatch(search(status.searchingText));
  }

  public setDisabled = () => {
    const { status } = store.getState();
    this.buttonElement.disabled = !status.searchingText || status.isSearching;
  }

  public setText = () => {
    const { status } = store.getState();
    const text = status.isSearching ? 'Searching...' : this.text;
    this.buttonElement.innerText = text;
  }

  public update = () => {
    this.setText();
    this.setDisabled();
  }

  public render() {
    this.appendChild(this.buttonElement);
  }
}

export default SearchButton;

customElements.define('search-button', SearchButton);
