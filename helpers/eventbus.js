export default class MicroBus extends EventTarget {
  on(type, listener) {
    this.addEventListener(type, listener);
  }
  once(type, listener) {
    this.addEventListener(type, listener, {once: true});
  }
  off(type, listener) {
    this.removeEventListener(type, listener);
  }
  emit(type, data) {
    const event = new CustomEvent(type, {detail: data});
    this.dispatchEvent(event);
  }
}
