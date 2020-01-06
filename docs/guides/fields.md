---
title: Field setup
lang: en-US
---

# Field setup

To `v-form` is activated by its individual fields. When a field on a standard `HTMLInput` or custom vue input components/web components gives the form the ability to perform validations.

## Initialization
By adding the directive `v-form-field` to the field, it signifies that the field should be validated:

```vue{5,6}
<template>
  <form v-form="myForm">
    <input 
      type="text
      v-model="myData.message"
      v-form-field >
  </form>
</template>
<script>
 // omitted for this example
</script>
```

::: danger FATAL

The `v-form-field` directive must be paired with `v-model`. If it is not an error will be thrown. This is because `v-model` updates the data while `v-form-field` validates the data.

:::

## Custom Input Events

Some times it is necessary to override the default browser `input` event or override the forms [v-form:inputEvent](form.html#custom-input-event) when a field is a custom web component or vue component that dispatches an input event that is not named `input`.

This is done by passing in an argument to `v-form-field` named `inputEvent` like the following:

```vue{6}
<template>
  <form v-form="myForm">
    <input 
      type="text
      v-model="myData.message"
      v-form-field:inputEvent="'my-input-event'" >
  </form>
</template>
<script>
 // omitted for this example
</script>
```

The above highlighted code tells Vue form to listen to events named `my-input-event` only for that particular field. This will also help `v-model` know how to set the value properly (which has been a limitation of `v-model` in the past).

## Active error

There are lots of use cases where you may want to alert users of their errors in real time. This library provides a way to control when an error is populated. 

When the `active-error` attribute is added to a form field it will ensure that the errors populate every time a user types in that field (on blur).

To take advantage of this feature just add `active-error` to the field:

```vue{7}
<template>
  <form v-form="messageForm">
    <input name="message.note" 
      type="text"
      v-form-field
      v-model="message.note"
      active-error >
    <div v-if="noteError">
      {{ noteError }}
    </div>
    <div>
      <button @click="submit" :disabled="!messageForm.isValid">Submit Message</button>
    </div>
  </form>
</template>
<script>
import { VueFormValidatorTypes } from 'vue-form';
export default {
  name: 'HelloForm',
  data() {
    return {
      message: {
        note: null
      },
      // creates the form validation handler
      messageForm: this.$createForm()
    }
  },
  mounted() {
    this.messageForm
      .setValidations({
        'note': [{
          type: VueFormValidatorTypes.MIN_LENGTH,
          validation: 8,
          message: 'Not enough characters. Needs to be at least 8',
        }],
      })
      .init();
  },
  methods: {
    submit() {
      /** omitted for this example **/
    },
  },
  computed: {
    noteError() {
      /** omitted for this example **/
    }
  }
};
```

### Demo
Click into the input field, type something and then click outside of the input field to see the error:

<br>

<ClientOnly>
  <ValidatorExample :validation="10" 
  :active="true"
  :validator="'min'" :msg="'Must be a number and the minimum number allowed is 10.'" />
</ClientOnly>
