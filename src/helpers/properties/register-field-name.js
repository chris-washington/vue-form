const registerFieldName = (el, name) => {
  Object.defineProperty(el, "name", {
    get() {
      return name;
    }
  });
};
export default registerFieldName;
