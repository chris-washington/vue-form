import { fromEvent } from "rxjs";
import { isNil, get } from "lodash-es";
import { addSubscription } from "../helpers/utils/operations";
import FieldAttributeHandler from "./field-attribute-handler";

export default class FieldEventHandler {
  constructor(el, fieldEvents, fieldValidator) {
    this.el = el;
    this.name = el.dataset.formField;
    const inputEvent = this.el.dataset.inputEvent || fieldEvents.inputEvent;
    this.bindInputEvent(inputEvent);
    this.bindBlurEvent();
    this.fieldValidator = fieldValidator;
    this.fieldAttributeHandler = new FieldAttributeHandler(el, fieldValidator);
  }

  async clear() {
    this.fieldAttributeHandler.clear();
  }

  bindInputEvent(inputEvent) {
    addSubscription(
      this.el,
      fromEvent(this.el, inputEvent).subscribe(this.handleInputEvent.bind(this))
    );
  }

  bindBlurEvent() {
    addSubscription(this.el, fromEvent(this.el, "blur").subscribe(this.handleBlurEvent.bind(this)));
  }

  handleEvent(event) {
    return new Promise(resolve => {
      setTimeout(async () => {
        event.preventDefault();
        const errors = await this.fieldValidator.validate();
        const { name } = this;
        const value = get(this.component, this.el.dataset.dataName);
        this.fieldAttributeHandler.setInputDirty();
        this.fieldAttributeHandler.setInputNotPristine();

        const state = {
          errors,
          pristine: this.el.isPristine,
          dirty: this.el.isDirty
        };

        resolve({
          state,
          name,
          value
        });
      }, 0);
    });
  }

  async handleInputEvent(event) {
    this.el.isInvalid = false;
    const activeError = !isNil(this.el.getAttribute("active-error"));
    if (activeError) {
      await this.handleBlurEvent(event);
    } else {
      this.onFormFieldInput(await this.handleEvent(event));
    }
  }

  async handleBlurEvent(event) {
    const result = await this.handleEvent(event);
    this.el.isInvalid = this.el.hasErrors;
    this.onFormFieldChanged(result);
  }

  initEventHandlers() {
    this.fieldAttributeHandler.init();
    const {
      handleFieldBlur,
      handleFieldInput,
      originalValue,
      component
    } = this.fieldValidator.getValidatorInfo();
    this.component = component;
    this.onFormFieldChanged = handleFieldBlur;
    this.onFormFieldInput = handleFieldInput;
    this.originalValue = originalValue;
  }
}
