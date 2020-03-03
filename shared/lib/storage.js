import decode from 'jwt-decode';

class TokenStorage {
  constructor() {
    this.key = 'gb-token';
  }

  get payload() {
    return this.token ? decode(this.token) : null;
  }

  get token() {
    return localStorage.getItem(this.key);
  }

  setKey(key) {
    this.key = key;
    return this;
  }

  setToken(token) {
    localStorage.setItem(this.key, token);
    return this;
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}

const tokenStorage = new TokenStorage();

Object.freeze(tokenStorage);

export default tokenStorage;