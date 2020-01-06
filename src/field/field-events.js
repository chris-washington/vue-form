export default class FieldEvents {
  constructor(inputEvent) {
    Object.defineProperty(this, "inputEvent", {
      get() {
        return inputEvent;
      }
    });
  }
}
