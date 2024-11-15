/* eslint-disable class-methods-use-this */
import decode from 'jwt-decode';

class TokenStorage {
  constructor() {
    this.key = 'gb-token';
  }

  get payload() {
    try {
      return this.token ? decode(this.token) : null;
    } catch (_) {
      return null;
    }
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

  getItem(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      return localStorage.getItem(key);
    }
  }

  clear() {
    localStorage.removeItem(this.key);
  }
}

const tokenStorage = new TokenStorage();

Object.freeze(tokenStorage);

export default tokenStorage;
