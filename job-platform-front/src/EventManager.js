export default class EventManager {
  constructor(contract) {
      this.contract = contract;
      this.listeners = {};
  }

  on(eventName, callback) {
      if (!this.listeners[eventName]) {
          this.listeners[eventName] = [];
          this.contract.on(eventName, (...args) => {
              this.listeners[eventName].forEach(listener => listener(...args));
          });
      }
      if (!this.listeners[eventName].includes(callback)) {
          this.listeners[eventName].push(callback);
      }
  }

  removeListener(eventName, callback) {
      if (this.listeners[eventName]) {
          this.listeners[eventName] = this.listeners[eventName].filter(
              listener => listener !== callback
          );
          this.contract.off(eventName, callback);
      }
  }

  removeAllListeners() {
      Object.keys(this.listeners).forEach(eventName => {
          this.contract.removeAllListeners(eventName);
      });
      this.listeners = {};
  }
}
