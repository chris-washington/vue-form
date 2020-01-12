import registerFieldName from "@/helpers/properties/register-field-name";

describe("helpers/properties/register-field-name.js", () => {
  let el;
  const name = "team";

  beforeEach(() => {
    jest.restoreAllMocks();
    el = {};

    registerFieldName(el, name);
  });

  describe("when name is retrieved", () => {
    it("then the name is returned", () => {
      expect(el.name).toBe(name);
    });
  });

  describe("when name is set", () => {
    it("then expect an error to be thrown because it is read only.", () => {
      const setName = () => (el.name = name);

      expect(setName).toThrow();
    });
  });
});
