/* eslint-disable no-new-func */
/* eslint-disable class-methods-use-this */
import {
  unset,
  cloneDeep,
  isFunction,
  size,
  get,
} from 'lodash';
import VueFieldHandler from './field-handler';
import VueFormObject from './form-object';

export default class VueFormHandler {
  constructor(el, component, formName) {
    this.el = el;

    this.formObject = new VueFormObject(component, formName, el);

    this.fieldHandler = new VueFieldHandler(
      el,
      this.formObject,
    ).initListeners();
  }

  initFormAttributes() {
    this.setFormValidity();
    this.formObject.setDirty(this.getFormDirtiness());
  }


  init() {
    this.formObject.getFormData()
      .subscribe(() => {
        this.watchFields();
        this.initForm();
        this.initFormAttributes();
      });
  }

  watchFields() {
    if (!this.watchFieldsCalled) {
      this.formObject.observe(this.fieldHandler
        .getFieldWatchers()
        .getChangeWatcher())
        .subscribe((fieldValues) => {
          this.handleFieldChange(fieldValues);
        });

      this.formObject.observe(this.fieldHandler
        .getFieldWatchers()
        .getInputWatcher())
        .subscribe((fieldValues) => {
          this.handleFieldInput(fieldValues);
        });
      this.watchFieldsCalled = true;
    }
  }

  handleFormSubmission(event) {
    event.preventDefault();
    // eslint-disable-next-line no-eval
    if (isFunction(this.formObject.onSubmit())) {
      this.formObject.onSubmit()(this.value || {});
      this.value = {};
    }
  }

  getListeners() {
    this.listeners = this.listeners || [];
    return this.listeners;
  }

  initForm() {
    if (!this.getListeners().includes(this.handleFormSubmission)) {
      this.el.addEventListener('submit', this.handleFormSubmission.bind(this));
      this.getListeners().push(this.handleFormSubmission);
      this.initFormCalled = true;
    }
  }

  getFields() {
    return this.fieldHandler.fields;
  }

  getFormDirtiness() {
    return Array.from(this.getFields())
      .map(field => field.getAttribute('dirty') === 'true')
      .reduce((accumulator, current) => accumulator || current, false);
  }

  setFormValidity() {
    const valid = Array.from(this.getFields())
      .map((field) => {
        const { name, errors } = this.fieldHandler.getFieldInputInfo(field);
        return size(get(errors, name)) === 0;
      })
      .reduce((accumulator, current) => accumulator && current);

    this.formObject.setValid(valid);
  }

  updateErrors(errors) {
    this.formObject.getForm().errors = cloneDeep(errors);
  }

  setFormValue() {
    this.value = cloneDeep(this.formObject.getData());
  }

  setFormAttributes(name, value) {
    this.formObject.setDataValue(name, value);
    this.formObject.setPristine(false);
    this.formObject.setDirty(this.getFormDirtiness());
    this.setFormValidity();
    this.setFormValue();
  }

  handleFieldInput({ name, value, errors }) {
    this.setFormAttributes(name, value);
    unset(errors, name);
    this.updateErrors(errors);
  }

  handleFieldChange({ name, value, errors }) {
    this.setFormAttributes(name, value);
    this.updateErrors(errors);
  }
}
