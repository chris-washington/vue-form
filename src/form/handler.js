import { takeWhile } from 'rxjs/operators';
import {
  isNil,
  set,
  get,
  unset,
} from 'lodash';

const defaultConfig = Object.freeze({
  inputEvent: 'input',
  changeEvent: 'change',
});

export default class VueFormHandler {
  constructor(el, component, objectName) {
    this.el = el;
    this.component = component;
    this.vueForm = this.component[objectName];
    this.objectName = objectName;
    this.inputKeys = [];
    this.fields = this.el.querySelectorAll('[rx-form-field-name]');
  }

  init() {
    this.vueForm.getFormData()
      .pipe(takeWhile(() => !this.vueForm.isDestroyed))
      .subscribe((data) => {
        if (!isNil(data)) {
          this.initData(data);
          this.originalData = Object.assign({}, this.data);
          this.setFormValidity();
          this.initDirty();
          this.initPristine();
          this.setupFieldListeners(data);
          this.initForm();
        }
      });
  }

  handleFormSubmission(event) {
    if (!this.vueForm.isValid) {
      event.preventDefault();
    }

    return true;
  }

  initForm() {
    this.el.addEventListener('submit', this.handleFormSubmission.bind(this));
  }

  initDirty() {
    const { el } = this;

    Object.defineProperty(this.vueForm, 'isDirty', {
      set(dirty) {
        this.dirty = dirty;
        el.setAttribute('dirty', dirty);
      },
      get() {
        return this.dirty || false;
      },
    });

    this.vueForm.isDirty = false;
  }

  initPristine() {
    const { el } = this;

    Object.defineProperty(this.vueForm, 'isPristine', {
      set(pristine) {
        this.pristine = pristine;
        el.setAttribute('pristine', pristine);
      },
      get() {
        return this.pristine || true;
      },
    });

    this.vueForm.isPristine = true;
  }

  setDirty(field) {
    const name = field.getAttribute('rx-form-field-name');

    if (get(this.originalData, name) !== get(this.data, name)) {
      field.setAttribute('dirty', true);
    } else {
      field.setAttribute('dirty', false);
    }
  }

  setFormDirtiness() {
    let isDirty = false;

    Object.keys(this.originalData).forEach((key) => {
      const originalValue = this.originalData[key];
      const currentValue = this.data[key] || '';

      isDirty = isDirty || originalValue !== currentValue;
    });

    this.vueForm.isDirty = isDirty;
  }

  hasErrors(errors) {
    for (let i = 0; i < this.fields.length; i += 1) {
      const field = this.fields[i];
      const name = field.getAttribute('rx-form-field-name');
      if (get(errors, name)) {
        return true;
      }
    }

    return false;
  }

  setFormValidity() {
    let allErrors;
    for (let i = 0; i < this.fields.length; i += 1) {
      const field = this.fields[i];
      const name = field.getAttribute('rx-form-field-name');
      const { value } = field;

      const errors = this.vueForm.validate(name, value);
      allErrors = Object.assign({}, allErrors, errors);
    }

    if (this.hasErrors(allErrors)) {
      this.el.setAttribute('valid', false);
      this.component[this.objectName].isValid = false;
    } else {
      this.el.setAttribute('valid', true);
      this.component[this.objectName].isValid = true;
    }
  }

  updateErrors(errors) {
    this.vueForm.errors = Object.assign(
      {},
      errors,
    );
    this.component[this.objectName].errors = Object.assign({}, this.vueForm.errors);
  }

  // eslint-disable-next-line class-methods-use-this
  setFieldValidity(field, errors, name) {
    if (errors && get(errors, name)) {
      field.setAttribute('valid', false);
    } else {
      field.setAttribute('valid', true);
    }
  }

  handleInput(event) {
    const field = event.target;
    this.setDirty(field);
    const name = field.getAttribute('rx-form-field-name');
    const { value } = field;
    set(this.data, name, value.trim() === '' ? null : value.trim());

    const errors = this.vueForm.validate(name, value);
    this.setFormValidity(errors);
    this.setFormDirtiness();
    this.setFieldValidity(field, errors, name);

    unset(errors, name);
    this.updateErrors(errors);
  }

  handleChange(event) {
    this.vueForm.isPristine = false;
    const field = event.target;
    this.setDirty(field);
    const name = field.getAttribute('rx-form-field-name');
    const { value } = field;

    const errors = this.vueForm.validate(name, value);

    this.setFieldValidity(field, get(errors, name), name);
    this.setFormValidity();
    this.setFormDirtiness();
    this.updateErrors(errors);
  }

  setupFieldListeners() {
    const config = Object.assign(
      {},
      defaultConfig,
      this.vueForm.config,
    );

    this.fields.forEach((field) => {
      field.addEventListener(config.inputEvent, this.handleInput.bind(this));
      field.addEventListener(config.changeEvent, this.handleChange.bind(this));
    });
  }

  initData(data) {
    this.data = data;
  }
}
