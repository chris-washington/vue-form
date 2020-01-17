import { set } from "lodash-es";
import registerInputEvent from "@/helpers/properties/register-input-event";

jest.mock("lodash-es");

describe("@/helpers/properties/register-input-event.js", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe("when registerInputEvent is called", () => {
    describe("and arg is null", () => {
      it("then nothing happens", () => {
        const el = {
          setAttribute: jest.fn()
        };
        const result = registerInputEvent(el);
        expect(set).not.toHaveBeenCalled();
        expect(result).toBeFalsy();
      });

      describe("and arg is inputEvent", () => {
        it("then el.dataset is set with inputEvent and the value", () => {
          const el = {
            dataset: {}
          };

          const value = "value";
          const arg = "inputEvent";
          const result = registerInputEvent(el, arg, value);
          expect(set).toHaveBeenCalledWith(el.dataset, "inputEvent", value);
          expect(result).toBeTruthy();
        });
      });
    });
  });
});
