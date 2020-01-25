function FieldEvents(inputEvent) {
  Object.defineProperty(this, "inputEvent", {
    get() {
      return inputEvent;
    }
  });
}

export default FieldEvents;
