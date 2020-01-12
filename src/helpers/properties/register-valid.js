const registerValid = el => {
  Object.defineProperty(el, "isValid", {
    set(valid) {
      this.valid = valid;

      if (valid) {
        this.removeAttribute("invalid");
        this.removeAttribute("aria-invalid");
      } else {
        this.setAttribute("aria-invalid", true);
        this.setAttribute("invalid", "");
      }
    },
    get() {
      return this.valid;
    }
  });
};

export default registerValid;
