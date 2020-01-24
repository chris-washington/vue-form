---
title: Working with state
lang: en-US
---

## Accessing errors

One of the more powerful features of VRx Form is automatic error population. As a field that has the v-form-field is interacted with, if erroneous error messages will begin to populate when the field is blurred (clicked away from) unless the field has the attribute [active-error](fields.html#active-error)).

As errors populate, they will be placed under the [VRXForm](/api/#vueform) objects: `<VRXForm>.state[<name-of-field>].errors.<error-name>`. They can also be accessed through the convenient VRXForm object method `getError`:

``` js
<VRXFORM>.getError('<field_name>', '<error_name>');
```

For instance, if a VRx Form is created on the data variable `myForm` and it has a field named `myInput` and that has 2 validators `PATTERN` and `MIN_LENGTH`, they can be accessed in the following ways:

```js
// gets pattern error
this.myForm.state.myInput.errors[VRXFormValidatorTypes.PATTERN];

// or also gets pattern error
this.myForm.getError('myInput', VRXFormValidatorTypes.PATTERN);

// gets minLength error
this.myForm.state.myInput.errors[VRXFormValidatorTypes.MIN_LENGTH];

// or also gets minLength
this.myForm.getError('myInput', VRXFormValidatorTypes.MIN_LENGTH);
```

::: danger FATAL
Accessing the errors could cause an `Null or Undefined Has No Properties` error. As a result you should default to using the `getError` method.
:::

If you must use the state variable to access the errors, you should always check for the errors existence before accessing it:

```js
const patternError = this.myForm.errors.myInput 
              ? this.myForm.errors.myInput[VRXFormValidatorTypes.PATTERN] : null;
```



### Accessing custom validator errors

When you create a custom validator the first argument in the super call is the type name. This name is how you can access the error. For instance, the custom validator with the constructor like the following:

```js{6}
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

Would be accessed like this: `<VRXForm>.state.<fieldName>.errors.teamExists` or better `<VRXForm>.getError('fieldName', 'teamExists');

## Priority message

There are two ways to access errors. Either on a fields specific error type as shown above or by using the fields `priorityMessage`:

```js
this.myForm.state.myInput.errors.priorityMessage;

// or better
this.myForm.getError("myInput"); // defaults to priorityMessage if no name is passed.
```

The `priorityMessage` property is based on the order of validations. If using the `priorityMessage` field to show errors you should always order the errors in the order you would like to show them (what takes priority over other validations).

For instance if a field has 3 validators:

```js
{
  type: VRXFormValidatorTypes.REQUIRED,
  validation: true,
  message: 'Please enter something in this field'
},
{
  type: VRXFormValidatorTypes.PATTERN,
  validation: /^(new|New)/,
  message: 'Should begin with new or New',
},
{
  type: VRXFormValidatorTypes.MIN_LENGTH,
  validation: 8,
  message: 'Not enough characters. Needs to be at least 8',
}
```

And all 3 validations above fails, the `priorityMessage` would be *"Please enter something in this field"*.

Or if both the `pattern` and `minLength` validations fail the `priorityMessage` would be *"Should begin with new or New"*.

## Styling errors

As a field becomes invalid, you can style this field by using the `[invalid]` selector. *Please note that using the built in browser `:invalid` tag will not work for styling*.

```css
input[invalid],
select[invalid],
textarea[invalid] {
  border: 1px solid #e74c3c !important;
}
```

> You may need the `!important` key to override other previous styles.

