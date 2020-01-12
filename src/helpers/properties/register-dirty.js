const registerDirty = el => {
  Object.defineProperty(el, "isDirty", {
    set(dirty) {
      this._dirty = dirty;

      if (dirty) {
        this.setAttribute("dirty", "");
      } else {
        this.removeAttribute("dirty");
      }
    },
    get() {
      return this._dirty;
    }
  });
};

export default registerDirty;
