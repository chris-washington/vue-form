import registerDatasetValid from "@/helpers/properties/register-dataset-valid";

describe("helpers/properties/register-dataset-valid.js", () => {
  describe("when isDataValid is set", () => {
    it("then dataValid should equal it", () => {
      const el = {};
      registerDatasetValid(el);
      el.isDataValid = true;

      expect(el._dataValid).toBeTruthy();
      expect(el.isDataValid).toBe(el._dataValid);
    });
  });
});
