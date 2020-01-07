const registerDirty = el => {
  Object.defineProperty(el, "isDirty", {
    set(dirty) {
      this.dirty = dirty;

      if (dirty) {
        this.setAttribute("dirty", "");
      } else {
        this.removeAttribute("dirty");
      }
    },
    get() {
      return this.dirty;
    }
  });
};

export default registerDirty;
