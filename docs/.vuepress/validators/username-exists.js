import { VRXFormCustomValidator } from 'vrx-form';

export default class UsernameExistsValidator extends VRXFormCustomValidator {
  constructor(message, options) {
    super('usernameExists', message || 'This username already exists', options);
  }

  inList(value) {
    return ['bestuser', 'hello_user', 'foo_user'].includes(value);
  }

  async validate(value) {
    // proving that asynchronous methods can be handled in the platform
    return !this.inList(value);
  }
}
