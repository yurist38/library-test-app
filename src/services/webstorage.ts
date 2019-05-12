class WebStorage {
  private storage: Storage;

  constructor(s: Storage) {
    this.storage = s;
  }

  public get = (key: string): any => {
    const value = this.storage.getItem(key);

    if (!value) {
      return;
    }

    try {
      const parsedValue = JSON.parse(value);
      return parsedValue;
    } catch (e) {
      console.log('Error during parsing the storage value...', e); // tslint:disable-line
    }
  }

  public set = (key: string, value: any): void => {
    const valueString = JSON.stringify(value);
    this.storage.setItem(key, valueString);
  }
}

const storage = new WebStorage(localStorage);

export default storage;
