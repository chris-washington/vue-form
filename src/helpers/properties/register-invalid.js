const registerInvalid = el => {
  Object.defineProperty(el, "isInvalid", {
    set(valid) {
      this.inValid = valid;
      if (valid) {
        this.setAttribute("invalid", "");
      } else {
        this.removeAttribute("invalid");
      }
    },
    get() {
      return this.inValid;
    }
  });
};

export default registerInvalid;
