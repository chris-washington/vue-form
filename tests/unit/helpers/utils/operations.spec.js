import {
  addSubscription,
  removeSubscriptions,
  isValidRange,
  throwIfNotTrue,
  isInclusiveEmpty,
  getModelDirective
} from "@/helpers/utils/operations";

describe("helpers/utils/operations.js", () => {
  let el;

  beforeEach(() => {
    el = {};
    jest.resetAllMocks();
  });

  describe("When getModelDirective is called", () => {
    let vnode;
    beforeEach(() => {
      vnode = {};
    });

    describe("and vnode.data is nil", () => {
      it("Then undefined is returned", () => {
        expect(getModelDirective(vnode)).toBeUndefined();
      });
    });

    describe("and vnode.data.directives and vnode.data.model is nil", () => {
      it("then undefined is returned", () => {
        vnode.data = {};
        expect(getModelDirective(vnode)).toBeUndefined();
      });
    });
    describe("and vnode.data.model is not nil", () => {
      it("then the correct model is returned", () => {
        const model = {
          name: "model"
        };

        vnode.data = {
          model
        };
        expect(getModelDirective(vnode)).toEqual(model);
      });
    });

    describe("and vnode.data.directives is not nil", () => {
      describe("and no model is found", () => {
        it("then undefined is returned", () => {
          vnode.data = {
            directives: [
              {
                name: "other"
              }
            ]
          };
          expect(getModelDirective(vnode)).toBeUndefined();
        });
      });

      describe("and a model is found", () => {
        it("then the model is returned is returned", () => {
          const model = {
            name: "model"
          };

          vnode.data = {
            directives: [model]
          };
          expect(getModelDirective(vnode)).toEqual(model);
        });
      });
    });
  });

  describe("When isInclusiveEmpty is called", () => {
    it("Then it returns the proper value for a string operation", () => {
      expect(isInclusiveEmpty(" ")).toBeTruthy();
      expect(isInclusiveEmpty("")).toBeTruthy();
      expect(isInclusiveEmpty("hello")).toBeFalsy();
    });

    it("Then it returns a proper value for all other types", () => {
      expect(isInclusiveEmpty(2)).toBeFalsy();
      expect(isInclusiveEmpty(null)).toBeTruthy();
      expect(isInclusiveEmpty(undefined)).toBeTruthy();
      expect(isInclusiveEmpty(false)).toBeTruthy();
      expect(isInclusiveEmpty(true)).toBeFalsy();
    });
  });

  describe("When throwIfNotTrue is called", () => {
    describe("when true", () => {
      it("then undefined is returned", () => {
        expect(throwIfNotTrue(true)).toBeUndefined();
      });
    });

    describe("when false", () => {
      it("then the expected error is thrown", () => {
        const error = "My oh my an error";
        const tothrow = () => throwIfNotTrue(false, error);
        expect(tothrow).toThrowError(error);
      });
    });
  });

  describe("When addSubscription is called", () => {
    it("then eventSubscriptions is updated", () => {
      const subscription = "subscription";

      addSubscription(el, subscription);
      expect(el.eventSubscriptions.length).toBe(1);
      expect(el.eventSubscriptions).toContain(subscription);
    });
  });

  describe("when isValidRange is called", () => {
    it("then it evaluates the range properly", () => {
      expect(isValidRange("string")).toBeFalsy();
      expect(isValidRange(null)).toBeFalsy();
      expect(isValidRange({})).toBeFalsy();
      expect(isValidRange(undefined)).toBeFalsy();
      expect(isValidRange([2, 3, 4])).toBeFalsy();
      expect(isValidRange([2])).toBeFalsy();
      expect(isValidRange([5, 3])).toBeFalsy();
      expect(isValidRange([5, 5])).toBeFalsy();
      expect(isValidRange([3, 10])).toBeTruthy();
    });
  });

  describe("When removeSubscriptions is called", () => {
    let unsubscribe;
    beforeEach(() => {
      unsubscribe = jest.fn();
      el.eventSubscriptions = [{ unsubscribe }];
    });

    describe("When !isNil and length > 0", () => {
      it("then unsubscribe is called", () => {
        removeSubscriptions(el);
        expect(unsubscribe).toHaveBeenCalledTimes(1);
      });
    });

    describe("When eventSubscriptions.length is 0", () => {
      beforeEach(() => {
        el.eventSubscriptions = [];
      });

      it("then unsubscribe is never called", () => {
        removeSubscriptions(el);
        expect(unsubscribe).not.toHaveBeenCalled();
      });
    });

    describe("When eventSubscriptions is nil", () => {
      beforeEach(() => {
        el = {};
      });

      it("then unsubscribe is never called", () => {
        removeSubscriptions(el);
        expect(unsubscribe).not.toHaveBeenCalled();
      });
    });
  });
});
