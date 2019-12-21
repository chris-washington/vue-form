import { takeWhile, filter } from 'rxjs/operators';
import {
  isNil,
  set,
} from 'lodash';

export default class VueFormObject {
  constructor(component, formName, el) {
    this.component = component;
    this.formName = formName;
    this.el = el;

    this.initDirtyAttribute();
    this.initPristineAttribute();
    this.initValidAttribute();
  }

  initValidAttribute() {
    const { el } = this;
    Object.defineProperty(this.getForm(), 'isValid', {
      set(valid) {
        this.valid = valid;
        if (valid) {
          el.setAttribute('valid', true);
          el.removeAttribute('invalid');
        } else {
          el.setAttribute('invalid', true);
          el.removeAttribute('valid');
        }
      },
      get() {
        return this.valid || false;
      },
    });
  }

  initDirtyAttribute() {
    const { el } = this;
    Object.defineProperty(this.getForm(), 'isDirty', {
      set(dirty) {
        this.dirty = dirty;
        if (dirty) {
          el.setAttribute('dirty', true);
        } else {
          el.removeAttribute('dirty');
        }
      },
      get() {
        return this.dirty || false;
      },
    });

    this.getForm().isDirty = false;
  }

  initPristineAttribute() {
    const { el } = this;
    Object.defineProperty(this.getForm(), 'isPristine', {
      set(pristine) {
        this.pristine = pristine;
        if (pristine) {
          el.setAttribute('pristine', true);
        } else {
          el.removeAttribute('pristine');
        }
      },
      get() {
        return this.pristine || true;
      },
    });

    this.getForm().isPristine = true;
  }

  onSubmit() {
    return this.getForm().getSubmit();
  }

  onClearForm() {
    return this.observe(this.getForm().getClearFormListener());
  }

  isDestroyed() {
    return this.getForm().isDestroyed;
  }

  validate(name, value) {
    return this.getForm().validate(name, value);
  }

  getConfig() {
    return this.getForm().config;
  }

  getForm() {
    return this.component[this.formName];
  }

  setValid(valid) {
    this.getForm().isValid = valid;
  }

  setDirty(dirty) {
    this.getForm().isDirty = dirty;
  }

  setPristine(pristine) {
    this.getForm().isPristine = pristine;
  }

  getData() {
    return this.getForm().data;
  }

  setDataValue(name, value) {
    set(this.getData(), name, value);
  }

  observe(observable) {
    return observable
      .pipe(takeWhile(() => !this.component[this.formName].isDestroyed))
      .pipe(filter(value => !isNil(value)));
  }

  getFormData() {
    return this.observe(this.getForm().getFormData());
  }
}
