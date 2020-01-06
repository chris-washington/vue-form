export default function registerValid(el) {
  Object.defineProperty(el, "isValid", {
    set(valid) {
      this.valid = valid;
      if (valid) {
        this.setAttribute("valid", "");
        this.removeAttribute("invalid");
        this.removeAttribute("aria-invalid");
      } else {
        this.setAttribute("aria-invalid", true);
        this.setAttribute("invalid", "");
        this.removeAttribute("valid");
      }
    },
    get() {
      return this.valid;
    }
  });
}
