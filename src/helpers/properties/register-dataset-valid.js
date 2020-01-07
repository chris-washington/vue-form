const registerDatasetValid = el => {
  Object.defineProperty(el, "isDataValid", {
    set(valid) {
      this.dataValid = valid;
    },
    get() {
      return this.dataValid;
    }
  });
};

export default registerDatasetValid;
