import FieldHandler from "@/field/field-handler";
import FieldValidator from "@/field/field-validator";
import FieldEvents from "@/field/field-events";

jest.mock("@/field/field-events");
jest.mock("@/field/field-validator");
jest.mock("@/field/field-event-handler");

describe("field/field-handler.js", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  describe("when initialized", () => {
    let fieldHandler;
    let el;
    let validatorInfo;
    const name = "myName";

    beforeEach(() => {
      el = {
        dataset: {
          formField: name
        }
      };

      validatorInfo = {
        inputEvent: "input"
      };

      fieldHandler = new FieldHandler(el, validatorInfo);
    });

    it("then it is properly intializaed", () => {
      expect(fieldHandler.el).toEqual(el);
      expect(fieldHandler.name).toBe(name);
      expect(fieldHandler.validatorInfo).toEqual(validatorInfo);
    });

    describe("when init is called", () => {
      let returnedFieldHandler;
      beforeEach(() => {
        jest.spyOn(fieldHandler, "initFieldEventHandler");
        returnedFieldHandler = fieldHandler.init();
      });

      it("then all initializations are handled", () => {
        expect(fieldHandler.fieldValidator).toBeDefined();
        expect(FieldValidator).toHaveBeenCalledWith(el, name, validatorInfo);
        expect(fieldHandler.initFieldEventHandler).toHaveBeenCalledWith(validatorInfo);
        expect(fieldHandler.fieldValidator.initValidators).toHaveBeenCalled();
        expect(returnedFieldHandler).toBe(fieldHandler);
      });
    });

    describe("when initFieldEventHandler is called", () => {
      beforeEach(() => {
        fieldHandler.initFieldEventHandler(validatorInfo);
      });

      it("then FieldEventHandler is initialized", () => {
        expect(FieldEvents).toHaveBeenCalledWith(validatorInfo.inputEvent);
      });
    });
  });
});
