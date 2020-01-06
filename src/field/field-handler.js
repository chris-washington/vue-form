import FieldValidator from './field-validator';
import FieldEventHandler from './field-event-handler';
import FieldEvents from './field-events';

export default class FieldHandler {
  constructor(el, validatorInfo) {
    this.el = el;
    this.name = this.el.dataset.formField;
    this.fieldValidator = new FieldValidator(this.el, this.name, validatorInfo);
    this.setFieldEventHandler(validatorInfo);
    this.init();
  }

  setFieldEventHandler({ inputEvent }) {
    const fieldEvents = new FieldEvents(inputEvent);
    this.fieldEventHandler = new FieldEventHandler(this.el, fieldEvents, this.fieldValidator);
  }

  clear() {
    this.fieldEventHandler.clear();
  }

  async revalidate() {
    return this.fieldValidator.validate();
  }

  init() {
    this.fieldEventHandler.initEventHandlers();
    this.fieldValidator.initValidators();
  }
}
