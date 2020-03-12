class EventEmitter {
  constructor() {
    this.events = {};
  }

  getEvent(name) {
    if (!this.events[name]) {
      this.events[name] = new Set();
    }

    return this.events[name];
  }

  onEventEmitted(name, fn) {
    this.getEvent(name).add(fn);
  }

  onEventEmittedOnce(name, fn) {
    const onceFn = (...args) => {
      this.removeListener(name, onceFn);
      fn.apply(this, args);
    };

    this.onEventEmitted(name, onceFn);
  }


  emitEvent(name, ...args) {
    this.getEvent(name).forEach((fn) => fn.apply(this, args));
  }

  onLastListenedEventEmitted(name, fn) {
    this.events[name] = new Set();

    this.onEventEmitted(name, fn);
  }

  removeListener(name, fn) {
    this.getEvent(name).delete(fn);
  }
}

export default EventEmitter;
