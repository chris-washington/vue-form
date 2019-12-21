/* eslint-disable class-methods-use-this */
import {
  isNil,
  get,
  cloneDeep,
} from 'lodash';
import { takeWhile, filter } from 'rxjs/operators';

import VueFieldWatchers from './field-watchers';

const defaultConfig = Object.freeze({
  inputEvent: 'input',
  changeEvent: 'change',
});

export default class VueFieldHandler {
  constructor(el, formObject) {
    this.fields = el.querySelectorAll('[data-form-field-name]');
    this.formObject = formObject;
    this.fieldWatchers = new VueFieldWatchers();
  }

  getFieldWatchers() {
    return this.fieldWatchers;
  }

  getFieldAttributes(field) {
    return {
      name: field.dataset.formFieldName,
      value: this.getCoercedValue(field.value),
    };
  }

  observe(observable) {
    return observable
      .pipe(takeWhile(() => !this.formObject.isDestroyed()))
      .pipe(filter(value => !isNil(value)));
  }

  setFieldDirty(field, value) {
    const name = field.dataset.formFieldName;
    if (get(this.originalData, name) !== value) {
      field.setAttribute('dirty', true);
    } else {
      field.removeAttribute('dirty');
    }
  }

  getConfig() {
    return Object.assign(
      {},
      defaultConfig,
      this.formObject.getConfig(),
    );
  }

  getFieldListeners() {
    this.fieldListeners = this.fieldListeners || [];

    return this.fieldListeners;
  }

  setFieldListener(field, eventName, method) {
    this.getFieldListeners().push(method);

    field.addEventListener(eventName, method);
  }

  getFieldValueFromData(field, data) {
    const { name } = this.getFieldAttributes(field);
    const value = get(data, name);
    return value;
  }

  clearField(field) {
    field.blur();
    // eslint-disable-next-line no-param-reassign
    field.value = '';
  }

  resetFieldAttributes(field) {
    field.removeAttribute('valid');
    field.removeAttribute('invalid');
    field.removeAttribute('dirty');
    field.addAttribute('pristine', true);
  }

  clearForm() {
    for (let i = 0, { length } = this.fields; i < length; i += 1) {
      const field = this.fields[i];
      this.clearField(field);
      const { name, value } = this.getFieldInputInfo(field);
      this.formObject.setDataValue(name, value);
    }

    this.formObject.getForm().setFormData(this.formObject.getData());
  }

  initClearFormListener() {
    this.formObject.onClearForm()
      .subscribe((doClearForm) => {
        if (doClearForm) {
          this.clearForm();
        }
      });
  }

  initListeners() {
    this.formObject.getFormData()
      .subscribe((data) => {
        this.originalData = cloneDeep(data);
        if (!this.listenersInititalized) {
          const config = this.getConfig();

          for (let i = 0, { length } = this.fields; i < length; i += 1) {
            const field = this.fields[i];
            this.setFieldListener(field, config.inputEvent, this.handleInput.bind(this));
            this.setFieldListener(field, config.changeEvent, this.handleChange.bind(this));
            field.setAttribute('pristine', true);
            field.value = this.getFieldValueFromData(field, data);
          }

          this.initClearFormListener();
          this.listenersInititalized = true;
        }
      });


    return this;
  }

  // eslint-disable-next-line class-methods-use-this
  getCoercedValue(value) {
    return isNil(value) ? '' : value.trim();
  }

  // eslint-disable-next-line class-methods-use-this
  setFieldValidity(field, errors, name) {
    if (errors && get(errors, name)) {
      field.removeAttribute('valid');
      field.setAttribute('invalid', true);
    } else {
      field.setAttribute('valid', true);
      field.removeAttribute('invalid');
    }
  }

  validateField(name, value) {
    return this.formObject.validate(name, value);
  }

  getFieldInputInfo(field) {
    const { name, value } = this.getFieldAttributes(field);

    this.setFieldDirty(field, value);

    const errors = this.validateField(name, value);

    return {
      name,
      value,
      errors,
    };
  }


  handleFieldEvent(event) {
    const field = event.target;
    field.removeAttribute('pristine');

    const result = this.getFieldInputInfo(field);

    this.setFieldValidity(field, result.errors, result.name);

    return result;
  }

  handleInput(event) {
    const result = this.handleFieldEvent(event);
    this.fieldWatchers.getInputWatcherSubject().next(result);
  }

  handleChange(event) {
    const result = this.handleFieldEvent(event);
    this.fieldWatchers.getChangeWatcherSubject().next(result);
  }
}
