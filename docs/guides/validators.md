---
title: Validator setup
lang: en-US
---

# Validator setup

VRx Form ships with many validators. The following sections walk through each one and how to use them. This includes custom validators.

## Required validator
The required validator ensures that a field is either marked required (meaning some text or selection must be present) or not.

::: tip
The required validator is only necessary to add if and only if you need to make a field not required by setting the validation to false, or when it is the only validator. By default if other validators are present, the field is required.
:::

It can be added to a field validator in the following way:

```js
// in the imports section
import { VRXFormValidatorTypes } from 'vrx-form';

// name of the form object here is dataForm

this.dataForm
  .setValidations({
    message: [{
      type: VRXFormValidatorTypes.REQUIRED,
      validation: true,
      message: 'This field is required.'
    }]
  })
  .init();

```

### Inputs
| Input | Type | Description |
|-------|------|-------------|
| type  | `VRXFormValidatorTypes.REQUIRED` | Creates a Required validator |
| validation | `Boolean` | Make the field required (true) or not (false) |
| message | `String` | The message of the error when a field is not valid |

### Demo
<br>

<ClientOnly>
  <ValidatorExample :validation="true" :validator="'required'" />
</ClientOnly>

## Range length validator
The range length validator ensures that a strings length is between a minimum character count and a maximum character count. It can be added to a field validator in the following way:

```js
// in the imports section
import { VRXFormValidatorTypes } from 'vrx-form';

// name of the form object here is dataForm

this.dataForm
  .setValidations({
    message: [{
      type: VRXFormValidatorTypes.RANGE_LENGTH,
      validation: [3, 16],
      message: 'Text length should be between 3 and 16 characters long'
    }]
  })
  .init();

```

### Inputs
| Input | Type | Description |
|-------|------|-------------|
| type  | `VRXFormValidatorTypes.RANGE_LENGTH` | Creates a Range Length validator |
| validation | `Array(Number)` | An array of length 2. 0 index is the `min` and the 1 index is the `max` |
| message | `String` | The message of the error when a field is not valid |

### Demo
<br>

<ClientOnly>
  <ValidatorExample :validation="[3,16]" :validator="'rangeLength'" />
</ClientOnly>

## Pattern validator
A pattern validator is be used for regular expression testing.

It can be added to a field validator in the following way:

```js
// in the imports section
import { VRXFormValidatorTypes } from 'vrx-form';

// name of the form object here is dataForm

this.dataForm
  .setValidations({
    message: [{
      type: VRXFormValidatorTypes.REQUIRED,
      validation: /^(new|New)/,
      message: 'This field must begin with new or New'
    }]
  })
  .init();

```

### Inputs
| Input | Type | Description |
|-------|------|-------------|
| type  | `VRXFormValidatorTypes.PATTERN` | Creates a Pattern validator |
| validation | `RegEx` | Sets an expected pattern for the field |
| message | `String` | The message of the error when a field is not valid |

### Demo
<br>

<ClientOnly>
  <ValidatorExample :validation="/^(new|New)/" :validator="'pattern'" :msg="'This field must begin with new or New'" />
</ClientOnly>

## Min length validator

A min length validator ensures that the field text is no shorter than the specified character length value.

It can be added to a field validator in the following way:

```js
// in the imports section
import { VRXFormValidatorTypes } from 'vrx-form';

// name of the form object here is dataForm

this.dataForm
  .setValidations({
    message: [{
      type: VRXFormValidatorTypes.MIN_LENGTH,
      validation: 5,
      message: 'This field must be at least 5 characters long.'
    }]
  })
  .init();

```

### Inputs
| Input | Type | Description |
|-------|------|-------------|
| type  | `VRXFormValidatorTypes.MIN_LENGTH` | Creates a Min Length validator |
| validation | `Number` | Sets the least amount of characters the field can have |
| message | `String` | The message of the error when a field is not valid |

### Demo
<br>

<ClientOnly>
  <ValidatorExample :validation="5" :validator="'minLength'" :msg="'This field must be at least 5 characters long.'" />
</ClientOnly>

## Max length validator

A max length validator ensures that the field text is no longer than the specified character length value.

::: warning
If the only validator on a field is a max length validator, but it is intended for the field to be required, you will need to add a [required](#required-validator) validator to the field and set it's `validation` to `true`.
:::

It can be added to a field validator in the following way:

```js
// in the imports section
import { VRXFormValidatorTypes } from 'vrx-form';

// name of the form object here is dataForm

this.dataForm
  .setValidations({
    message: [{
      type: VRXFormValidatorTypes.MIN_LENGTH,
      validation: 8,
      message: 'This field must be no more than 8 characters long.'
    }]
  })
  .init();

```

### Inputs
| Input | Type | Description |
|-------|------|-------------|
| type  | `VRXFormValidatorTypes.MAX_LENGTH` | Creates a Max Length validator |
| validation | `Number` | Sets the max amount of characters the field can have |
| message | `String` | The message of the error when a field is not valid |

### Demo
<br>

<ClientOnly>
  <ValidatorExample :validation="8" :validator="'maxLength'" :msg="'This field must be no more than 8 characters long.'" />
</ClientOnly>

## Min validator

A min validator ensures that the field text is a number and no smaller than the specified value.

It can be added to a field validator in the following way:

```js
// in the imports section
import { VRXFormValidatorTypes } from 'vrx-form';

// name of the form object here is dataForm

this.dataForm
  .setValidations({
    message: [{
      type: VRXFormValidatorTypes.MIN,
      validation: 10,
      message: 'Must be a number and the minimum number allowed is 10.'
    }]
  })
  .init();

```

### Inputs
| Input | Type | Description |
|-------|------|-------------|
| type  | `VRXFormValidatorTypes.MIN` | Creates a Min  validator |
| validation | `Number` | Sets the lowest number allowed |
| message | `String` | The message of the error when a field is not valid |

### Demo
<br>

<ClientOnly>
  <ValidatorExample :validation="10" :validator="'min'" :msg="'Must be a number and the minimum number allowed is 10.'" />
</ClientOnly>

## Max validator

A max validator ensures that the field text is a number and no larger than the specified value.

::: warning
If the only validator on a field is a max validator, but it is intended for the field to be required, you will need to add a [required](#required-validator) validator to the field and set it's `validation` to `true`.
:::

It can be added to a field validator in the following way:

```js
// in the imports section
import { VRXFormValidatorTypes } from 'vrx-form';

// name of the form object here is dataForm

this.dataForm
  .setValidations({
    message: [{
      type: VRXFormValidatorTypes.MAX,
      validation: 10,
      message: 'Must be a number and the max number allowed is 10.'
    }]
  })
  .init();

```

### Inputs
| Input | Type | Description |
|-------|------|-------------|
| type  | `VRXFormValidatorTypes.MAX` | Creates a Max  validator |
| validation | `Number` | Sets the largest number allowed |
| message | `String` | The message of the error when a field is not valid |

### Demo
<br>

<ClientOnly>
  <ValidatorExample :validation="10" :validator="'max'" :msg="'Must be a number and the minimum number allowed is 10.'" />
</ClientOnly>

## Custom validator

A custom validator allows you to create your own validators to handle more complex validations.

It can be added to a field validator in the following way:

```js
// a custom validator in custom-validator.js
import { VRXFormCustomValidator } from 'vrx-form';

class GoofyValidator extends VRXFormCustomValidator {
  constructor(message, options) {
    // must make super call. Options are optional
    super('goofy', message || 'Should start with GOOFY', options);
  }

  allowLowercase() {
    const {options} = this;
    return options && options.allowLowercase;
  }

  isString(value) {
    return typeof value === 'string';
  }

  defaultValidate(value) {
    return this.isString(value) && value.startsWith('GOOFY');
  }

  lowercaseValidate(value) {
    return this.isString(value) && value.startsWith('goofy');
  }

  validate(value) {
    if (this.allowLowercase()) {

      return this.defaultValidate(value) || this.lowercaseValidate(value);
    }

    return this.defaultValidate(value);
  }

  /**
   * Need to override getMessage to account for different default message
   */
  getMessage() {
    if (this.allowLowercase()) {
      return 'Should start with GOOFY or goofy.';
    }
    return this.message;
  }
}
```

```js
// in the imports section
import { VRXFormValidatorTypes } from 'vrx-form';
import GoofyValidator from './custom-validaor';

// name of the form object here is dataForm
this.dataForm
  .setValidations({
    message: [{
      type: GoofyValidator,
      // can override the default message in custom validator
      message: 'Just type GOOFY and click the button ->',
      options: {
        allowLowercase: true
      }
    }]
  })
  .init();

```

### Inputs
| Input | Type | Description |
|-------|------|-------------|
| type  | `VRXFormCustomValidator` | Creates a custom validator |
| validation | `null` | Validation is built into validator |
| options | `any` | Allows for custom validators to be configurable |
| message | `String` | The message of the error when a field is not valid |

### Demo
<br>

<ClientOnly>
  <ValidatorExample :validation="null" :options="{allowLowercase: true}" :validator="'custom'" :msg="'Just type GOOFY and click the button ->'" />
</ClientOnly>

### Asynchronous validate method

The validate method can also be asynchronous. If you need to make a call to a server, for instance, you can make that call returning the promise. 

```js
import axios from 'Axios';

class TeamExistsValidator extends VRXFormCustomValidator {
  constructor(message, options) {
    // must make super call. Options are optional
    super('teamExists', message || 'This team already exists, please choose another one.', options);
  }

  validate(value) {
    if (value) {
      return axios.get(`http://api.team.com/exists/${value}`);
    }

    return Promise.resolve(false);
  }
}
```
