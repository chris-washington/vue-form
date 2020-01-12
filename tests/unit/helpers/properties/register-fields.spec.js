import registerFields from "@/helpers/properties/register-fields";

describe("helpers/properties/register-fields.js", () => {
  let el;
  const inputFields = ["<input />"];
  beforeEach(() => {
    jest.clearAllMocks();

    jest.spyOn(Array, "from");
    el = {
      querySelectorAll: jest.fn().mockReturnValue(inputFields)
    };

    registerFields(el);
  });

  describe("When fields is retrieved", () => {
    let fields;
    beforeEach(() => {
      fields = el.fields;
    });

    it("fields returns the correct value", () => {
      expect(fields).toEqual(inputFields);
    });

    it("then querySelectorAll is called with '[data-form-field]'", () => {
      expect(el.querySelectorAll).toHaveBeenLastCalledWith("[data-form-field]");
    });
  });
  describe("when fields is called and it is already been set", () => {
    beforeEach(() => {
      el._fields = [];
      el.fields;
    });

    it("then querySelectorAll is not called", () => {
      expect(el.querySelectorAll).not.toHaveBeenCalled();
    });
  });
});
