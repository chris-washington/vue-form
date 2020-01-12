import registerGlobal from "@/helpers/properties/register-global";
import registerDirty from "@/helpers/properties/register-dirty";
import registerPristine from "@/helpers/properties/register-pristine";
import registerValid from "@/helpers/properties/register-valid";

jest.mock("@/helpers/properties/register-dirty");
jest.mock("@/helpers/properties/register-pristine");
jest.mock("@/helpers/properties/register-valid");

describe("helpers/properties/register-global.js", () => {
  let el;

  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();

    el = {
      value: "5"
    };
    registerGlobal(el);
  });

  describe("When registerGlobal is called", () => {
    it("then registerDirty is called", () => {
      expect(registerDirty).toHaveBeenCalledWith(el);
    });

    it("then registerPristine is called", () => {
      expect(registerPristine).toHaveBeenCalledWith(el);
    });

    it("then registerValid is called", () => {
      expect(registerValid).toHaveBeenCalledWith(el);
    });
  });
});
