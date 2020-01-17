import { set } from "lodash-es";
import { fromEvent, Subject } from "rxjs";
import registerCustomInput from "@/helpers/properties/register-custom-input";
import { addSubscription, getModelDirective } from "@/helpers/utils/operations";

jest.mock("lodash-es");
jest.mock("rxjs", () => {
  const { Subject } = jest.requireActual("rxjs");

  return {
    __esModule: true,
    fromEvent: jest.fn(),
    Subject
  };
});

jest.mock("@/helpers/utils/operations");

describe("helpers/properties/register-custom-input.js", () => {
  describe("when called", () => {
    describe("when inputEvent is input", () => {
      it("then nothing is called", () => {
        registerCustomInput(undefined, "input");
        expect(set).not.toHaveBeenCalled();
        expect(fromEvent).not.toHaveBeenCalled();
        expect(addSubscription).not.toHaveBeenCalled();
        expect(getModelDirective).not.toHaveBeenCalled();
      });
    });
    describe("when inputEvent is not input", () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      it("then subscription is added", () => {
        const inputEvent = "my-input-event";

        const vnode = {
          data: {
            elm: {},
            model: {
              callback: jest.fn()
            }
          }
        };
        const event = { detail: "myvalue" };
        const value = "somevalue";

        getModelDirective.mockImplementation(() => ({
          value
        }));

        let subscribe = new Subject();

        fromEvent.mockReturnValue(subscribe.asObservable());

        registerCustomInput(vnode, inputEvent);
        subscribe.next(event);
        jest.runAllTicks();

        expect(set).toHaveBeenCalledWith(vnode.elm, "value", value);
        expect(addSubscription).toHaveBeenCalledWith(expect.anything());
        expect(fromEvent).toHaveBeenCalledWith(vnode.elm, inputEvent);
        expect(vnode.data.model.callback).toHaveBeenCalledWith(event.detail);
      });
    });
  });
});
