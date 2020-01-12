import registerDirty from "@/helpers/properties/register-dirty";

describe("helpers/properties/register-dirty.js", () => {
  describe("when isDirty is set", () => {
    let el;
    beforeEach(() => {
      el = {
        setAttribute: jest.fn(),
        removeAttribute: jest.fn()
      };

      registerDirty(el);
      jest.restoreAllMocks();
    });

    it("then dirty should equal it", () => {
      el.isDirty = true;

      expect(el._dirty).toBeTruthy();
      expect(el.isDirty).toBe(el._dirty);
    });

    describe("and isDirty is true", () => {
      it("then setAttribute is called", () => {
        el.isDirty = true;

        expect(el.setAttribute).toHaveBeenLastCalledWith("dirty", "");
      });
    });

    describe("and isDirty is false", () => {
      it("then removeAttribute is called", () => {
        el.isDirty = false;

        expect(el.removeAttribute).toHaveBeenLastCalledWith("dirty");
      });
    });
  });
});
