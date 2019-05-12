import { setSearchingText } from '../../actions/status.action';
import store from '../../store';
import './styles';

class SearchInput extends HTMLElement {
  private inputEl: HTMLInputElement;
  private micIconEl: HTMLElement;
  private placeholder: string;
  private recognition: any;
  private isRecording: boolean = false;

  constructor() {
    super();

    this.inputEl = document.createElement('input');
    this.micIconEl = this.getMicIcon();
    this.placeholder = this.getAttribute('placeholder') || '';
    this.inputEl.placeholder = this.placeholder;
    store.subscribe(this.onUpdate);

    this.appendChild(this.inputEl);
    this.appendChild(this.micIconEl);

    // @ts-ignore
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    if ('SpeechRecognition' in window) {
      // @ts-ignore
      this.recognition = new window.SpeechRecognition();
      this.recognition.onresult = this.onSpeech;
    }
  }

  public onChange = (event: Event): void => {
    const { dispatch } = store;
    const { value } = event.target as HTMLInputElement;
    dispatch(setSearchingText(value));
  }

  public connectedCallback() {
    this.inputEl.addEventListener('keyup', this.onChange);
    this.micIconEl.addEventListener('click', this.onClickMic);
  }

  public disconnectedCallback() {
    this.inputEl.removeEventListener('keyup', this.onChange);
    this.micIconEl.removeEventListener('click', this.onClickMic);
  }

  private onUpdate = () => {
    const { status } = store.getState();

    if (status.isSearching && this.inputEl.value) {
      this.inputEl.value = '';
    }
  }

  private getMicIcon = (): HTMLElement => {
    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-microphone');
    return icon;
  }

  private onClickMic = () => {
    if (!this.recognition) {
      return;
    }

    this.micIconEl.classList.toggle('fa-microphone');
    this.micIconEl.classList.toggle('fa-microphone-slash');

    if (this.isRecording) {
      this.recognition.stop();
      this.isRecording = false;
    } else {
      this.recognition.start();
      this.isRecording = true;
    }
  }

  private onSpeech = (event: any) => {
    const { dispatch } = store;
    const text = event.results[0][0].transcript;
    this.inputEl.value = text;
    dispatch(setSearchingText(text));
  }
}

export default SearchInput;

customElements.define('search-input', SearchInput);
