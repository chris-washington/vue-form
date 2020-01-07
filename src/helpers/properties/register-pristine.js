const registerPristine = el => {
  Object.defineProperty(el, "isPristine", {
    set(pristine) {
      this.pristine = pristine;

      if (pristine) {
        this.setAttribute("pristine", "");
      } else {
        this.removeAttribute("pristine");
      }
    },
    get() {
      return this.pristine;
    }
  });
};

export default registerPristine;
