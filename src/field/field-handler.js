import FieldValidator from "./field-validator";
import FieldEventHandler from "./field-event-handler";
import FieldEvents from "./field-events";

function FieldHandler(el, validatorInfo) {
  this.el = el;
  this.name = this.el.dataset.formField;
  this.validatorInfo = validatorInfo;
}

FieldHandler.prototype = {
  init() {
    this.fieldValidator = new FieldValidator(this.el, this.name, this.validatorInfo);
    this.initFieldEventHandler(this.validatorInfo);
    this.fieldValidator.initValidators();
    return this;
  },

  initFieldEventHandler({ inputEvent }) {
    const fieldEvents = new FieldEvents(inputEvent);
    this.fieldEventHandler = new FieldEventHandler(this.el, fieldEvents, this.fieldValidator);
    this.fieldEventHandler.initEventHandlers();
  },

  clear() {
    this.fieldEventHandler.clear();
  },

  async revalidate() {
    return this.fieldValidator.validate();
  }
};

export default FieldHandler;
