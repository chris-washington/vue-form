import { set } from "lodash-es";
import { getModelDirective } from "@/helpers/utils/operations";
import registerModel from "@/helpers/properties/register-model";

jest.mock("@/helpers/utils/operations");
jest.mock("lodash-es", () => {
  const actual = jest.requireActual("lodash-es");
  return {
    ...actual,
    set: jest.fn()
  };
});

describe("helpers/properties/register-model.js", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  describe("when called", () => {
    describe("when expression is defined", () => {
      it("then an error is thrown", () => {
        const vnode = {};
        const el = { dataset: {} };
        getModelDirective.mockReturnValue({ expression: "some.name" });
        registerModel(el, vnode);
        expect(set).toHaveBeenCalledWith(el.dataset, "formField", "name");
        expect(set).toHaveBeenCalledWith(el.dataset, "dataName", "some.name");
      });
    });
    describe("when expression is not defined", () => {
      it("then an error is thrown", () => {
        const vnode = {};
        const el = {};
        const throwError = () => registerModel(el, vnode);

        expect(throwError).toThrowError(
          "v-model directive must be present with a v-form-field directive"
        );
      });
    });
  });
});
