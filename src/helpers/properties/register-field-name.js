export default function registerFieldName(el, name) {
  Object.defineProperty(el, 'name', {
    get() {
      return name;
    },
  });
}
