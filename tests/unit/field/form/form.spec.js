import { has } from "lodash-es";
import { BehaviorSubject, Observable } from "rxjs";
import VueForm from "@/form/form";

jest.mock("lodash-es");

describe("form/form.js", () => {
  describe("when initialized", () => {
    let vueForm;

    beforeEach(() => {
      vueForm = new VueForm();
    });

    it("then initializations have happened", () => {
      expect(vueForm.initSubject).toBeInstanceOf(BehaviorSubject);
      expect(vueForm.clearFormSubject).toBeInstanceOf(BehaviorSubject);
      expect(vueForm.errors).toEqual({});
      expect(vueForm.validators).toEqual({});
    });

    describe("when isDirty is accessed", () => {
      it("then it returns dirty", () => {
        vueForm.dirty = true;
        expect(vueForm.isDirty).toBeTruthy();
      });
    });

    describe("when isPristine is accessed", () => {
      it("then it returns pristine", () => {
        vueForm.pristine = true;
        expect(vueForm.isPristine).toBeTruthy();
      });
    });

    describe("when isValid is set", () => {
      it("then it isValid is expected value", () => {
        vueForm.isValid = true;
        expect(vueForm.isValid).toBeTruthy();
      });
    });

    describe("when hasError is called", () => {
      it("then has is called with errors and name", () => {
        const name = "fieldName";
        vueForm.hasError(name);

        expect(has).toHaveBeenCalledWith(vueForm.errors, name);
      });
    });

    describe("when setValidators is called", () => {
      it("then it returns itself and validators is set", () => {
        const validators = {
          myValidator: "validator"
        };

        expect(vueForm.setValidations(validators).getValidators()).toEqual(validators);
      });
    });

    describe("when clearForm is called", () => {
      it("then it clearFormSubject.next is called", () => {
        jest.spyOn(vueForm.clearFormSubject, "next");
        vueForm.clearForm();
        expect(vueForm.clearFormSubject.next).toHaveBeenCalledWith(true);
      });
    });

    describe("when getClearFormObservable is called", () => {
      it("then an observable is returned", () => {
        expect(vueForm.getClearFormObservable()).toBeInstanceOf(Observable);
      });
    });

    describe("when init is called", () => {
      it("then it initSubject.next is called", () => {
        jest.spyOn(vueForm.initSubject, "next");
        vueForm.init();
        expect(vueForm.initSubject.next).toHaveBeenCalledWith(true);
      });
    });

    describe("when getInitObservable is called", () => {
      it("then an observable is returned", () => {
        expect(vueForm.getInitObservable()).toBeInstanceOf(Observable);
      });
    });
  });
});
