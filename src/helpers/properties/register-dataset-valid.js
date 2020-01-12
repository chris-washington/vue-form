const registerDatasetValid = el => {
  Object.defineProperty(el, "isDataValid", {
    set(valid) {
      this._dataValid = valid;
    },
    get() {
      return this._dataValid;
    }
  });
};

export default registerDatasetValid;
