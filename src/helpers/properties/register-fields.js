export default function registerFields(el) {
  Object.defineProperty(el, "fields", {
    get() {
      return Array.from(this.querySelectorAll("[data-form-field"));
    }
  });
}
