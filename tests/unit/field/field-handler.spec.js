import FieldHandler from "@/field/field-handler";
import FieldValidator from "@/field/field-validator";
import FieldEvents from "@/field/field-events";
import FieldEventHandler from "@/field/field-event-handler";

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

    describe("when revalidate is called", () => {
      beforeEach(async () => {
        fieldHandler.init();
        await fieldHandler.revalidate();
      });

      it("then fieldValidator.validate is called", () => {
        expect(fieldHandler.fieldValidator.validate).toHaveBeenCalled();
      });
    });

    describe("when clear is called", () => {
      beforeEach(() => {
        fieldHandler.init();
        fieldHandler.clear();
      });

      it("then fieldEventHandler.clear is called", () => {
        expect(fieldHandler.fieldEventHandler.clear).toHaveBeenCalled();
      });
    });

    describe("when initFieldEventHandler is called", () => {
      let fieldValidator;
      beforeEach(() => {
        fieldValidator = jest.fn();
        fieldHandler.fieldValidator = fieldValidator;
        fieldHandler.initFieldEventHandler(validatorInfo);
      });

      it("then FieldEventHandler is initialized", () => {
        expect(FieldEvents).toHaveBeenCalledWith(validatorInfo.inputEvent);
        expect(FieldEventHandler).toHaveBeenLastCalledWith(
          el,
          expect.any(FieldEvents),
          fieldValidator
        );
      });
    });
  });
});
