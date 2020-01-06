import { BehaviorSubject } from 'rxjs';
import {
  has,
} from 'lodash-es';

/**
 * @module VueForm
 * @class
 * @classdesc Used to create a form object to do validation
 */
export default class VueForm {
  /**
   * Creates a form object that can do validations
   *
   * @example
   * // To initialize
   * export default {
   *    data() {
   *      return {
   *        myForm: this.$createForm(),
   *      };
   *    },
   * }
   *
   * @example
   * // can also import
   * import { VueForm } from 'vue-form'
   *
   * export default {
   *    data() {
   *      return {
   *        myForm: new VueForm(),
   *      }
   *    }
   * }
   */
  constructor() {
    this.initSubject = new BehaviorSubject();
    this.validators = {};
    this.errors = {};
    this.clearForSubject = new BehaviorSubject();
  }

  /**
   * Returns whether a form is dirty. A form is dirty
   * When 1 or more fields value does not match its original
   * valuebundleRenderer.renderToStream
   */
  get isDirty() {
    return this.dirty;
  }

  /**
   * Returns whether a form is pristine. A form is pristine
   * if a user has never changes a value in a field. Once changed
   * it does not return to a pristine state.
   */
  get isPristine() {
    return this.pristine;
  }

  /**
   * Returns whether a form has fields that, when validated are
   * all valid.
   */
  get isValid() {
    return this.valid;
  }

  /**
   * @private
   */
  set isValid(valid) {
    this.valid = valid;
  }

  /**
   * Returns whether a field has errors
   * @param {string } name - name of the field that needs input.
   *
   * @example
   * // if your data looks like the following:
   * myData: {
   *   myInput: null
   * }
   *
   * // errors can be retrieved by
   * myForm.hasError('myInput');
   *
   * @example
   * // for deeply nested validation.
   * // if your data looks like the following:
   * myData: {
   *  someEntity: {
   *    myInput: null
   *  }
   * }
   *
   * // errors can be retrieved by
   * myForm.hasError('someEntity.myInput');
   */
  hasError(name) {
    return has(this.errors, name);
  }

  /**
   * Sets the validators that will validate the fields. Once {@link init}
   * is called this can no longer be set.
   *
   * @param {...VueFormDataValidator} validators - the validators to validate each field.
   * @returns {VueForm} - returns self for chaining.
   */
  setValidations(validators) {
    this.validators = validators;
    return this;
  }

  /**
   * Clears the form back to a blank state. Please
   * Note that this does not send it back to its original
   * state.
   */
  clearForm() {
    this.clearForSubject.next(true);
  }

  /**
   * @private
   */
  getClearFormObservable() {
    return this.clearForSubject.asObservable();
  }

  /**
   * The final step in the form setup. Once the data
   * is submitted and the validators are added, init
   * has to be called to start the process of validation.
   */
  init() {
    this.initSubject.next(true);
  }

  /**
   * @private
   */
  getInitObservable() {
    return this.initSubject.asObservable();
  }

  /**
   * Returns the current validator object.
   * @returns {...VueFormDataValidator}
   */
  getValidators() {
    return this.validators;
  }
}


/**
 * Defines a validation for a field
 * @typedef {Object} VueFormValidator
 * @property {VueFormValidatorTypes|VueFormCustomValidator} type - The type of validation to be done
 * @property {string|number} validation - a number or string to validate against.
 * @property {string} message - what to include in errors if the validation fails.
 */
