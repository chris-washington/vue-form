---
title: Getting Started
lang: en-US
---

# VRx Form<Badge text="beta" type="warning"/> Getting Started 

## Overview
VRx Form seeks to be a simple abstraction layer for form validation and form event handling. VRx Form had 5 goals in development:

* Needed to work with the existing `v-model` directive (and enforce it)
* Minimal directives for developers to remember
* Provide a simple interface for setup and interactions with the form validations.
* Speed up development and not overcomplicate the experience.
* **And most importantly:** Make validations configurable. Once your form is built, adding validations doesn't add more methods or if statements to the code. 

## Installation

NPM is the recommended choice for installation:

```javascript
npm i vrx-form
```

## Setup

VRx Form comes in the form of a plugin:

```js
import Vue from 'vue';
import VRXForm from 'vrx-form';

Vue.use(VRXForm);
```

## Quick start

Once the plugin is installed, VRXForm objects can be created in a component. Below, is a step by step guide for creating a new form with VRx Form validations. For the purposes of the quick start guide, it will walk through creating a message form.

### Form creation
First, create the form and add the `v-form` directive:

``` vue{3-5,13}
<template>
  <div>
    <form v-form="messageForm">
      <!-- omitted fields -->
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageForm: this.$createForm()
    }
  }
}
</script>
```

In order to use the `v-form` directive it must be on a `form` elememnt. It must also receive a data object that is of type [VRXForm](/api#vueform).

When the `VRXForm` plugin is created, each component has access to a method called `$createForm` which is in the component scope. This will create the `VRXForm` data object as shown above.

### Field initialization

Next, a form needs fields with the `v-form-field` directive, to start validating.:

``` vue{4-6,16-18}
<template>
  <div>
    <form v-form="messageForm">
      <input name="message.note" type="text" 
        v-form-field
        v-model="message.note">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageForm: this.$createForm(),
      message: {
        note: null
      }
    }
  }
}
</script>
```

All fields must be within a `v-form` form element. Each field used for validation should use the built in `v-model` as well as the `v-form-field`.

`v-form-field` relies on `v-model` to dynamically update the data model and value of the input. For more information on `v-model` check out the Vue documentation <a href="https://vuejs.org/v2/guide/forms.html" target="_blank">here</a>.

::: tip
`v-form-field` can help with handling events from `v-model` on custom webcomponents, by adding custom hooks to `v-model`. Read more [here](fields).
:::


### Validation initialization

After the VRx Form is created and potentially the data being retrieved, for instance, when editing, the form needs to begin the data initialization process by setting the validators. 

#### Set the validations
Next, when initializing, the validations must be set before VRx Form will validate:

```vue{30-35}
<template>
  <!-- pass in the VRXForm object into the v-form directive -->

  <form v-form="messageForm">
    <!-- all form fields must have v-form-field and v-model to work -->
    <input name="message.note" type="text" 
      v-form-field
      v-model="message.note">
  </form>
</template>
<script>
// provides an object with built in validators
import { VRXFormValidatorTypes } from 'vrx-form';
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
      // This is how a validator is set
      .setValidations({
        'note': [{
          type: VRXFormValidatorTypes.MIN_LENGTH,
          validation: 8,
          message: 'Not enough characters. Needs to be at least 8',
        }],
      });
  }
};
</script>
```

This adds 1 validator (a field can have multiple validators) to the `message.note` data field. A validator includes the following:

* `type` which is the type of validator. In this case, it is the min length validator
* `validation` value which is, for the case of the min length validator, the mininum length of the string typed in by the user. Not all validator types have a validation value.
* `message` the message to display when an error occurs from user input.

::: tip
If a field has any number of validators minus the Required Validator, by default the field is marked required.

Check out the [validators setup](validators), for more validation options, including custom validations.
:::

#### Bind submit action
Next, although not necessary, a form can set what action should be taken when a form submits. To demonstrate this, add a `button` to the form, a `submit` method, and bind a click even to it:

```vue{11,42-46}
<template>
  <!-- pass in the VRXForm object into the v-form directive -->

  <form v-form="messageForm">
    <!-- all form fields must have v-form-field and v-model to work -->
    <input name="message.note" type="text" 
      v-form-field
      v-model="message.note">
    <div>
      <button 
      @click="submit" :disabled="!messageForm.isValid">Submit Message</button>
    </div>
  </form>
</template>
<script>
// provides an object with built in validators
import { VRXFormValidatorTypes } from 'vrx-form';
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
      // This is how a validator is set
      .setValidations({
        'note': [{
          type: VRXFormValidatorTypes.MIN_LENGTH,
          validation: 8,
          message: 'Not enough characters. Needs to be at least 8',
        }],
      });
  },
  methods: {
    submit() {
      console.log('message data', this.message);
      // can clear a form at any point in time.
      this.messageForm.clearForm();
    },
  }
};
</script>
```

Notice that on the `button`, the disabled attribute can be controlled by whether the field is valid or not. No submit action can happen, including hitting enter, if a field is marked as invalid.

### Form initialization

The last step before validations can begin is to initialize the validations. The reason this doesn't start automatically is because some times (on edits, for instance) the data hasn't returned from the server yet. Init only needs to be called once:

```vue{33}
<template>
  <!-- pass in the VRXForm object into the v-form directive -->

  <form v-form="messageForm">
    <!-- all form fields must have v-form-field and v-model to work -->
    <input name="message.note" type="text" 
      v-form-field
      v-model="message.note">
    <div>
      <button 
      @click="submit" :disabled="!messageForm.isValid">Submit Message</button>
    </div>
  </form>
</template>
<script>
// provides an object with built in validators
import { VRXFormValidatorTypes } from 'vrx-form';
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
      // This is how a validator is set
      .setValidations(/** omitted **/)
      .init();
  },
  methods: {
    /** omitted **/
  }
};
</script>
```


At this point validation can happen on a given form. But this isn't very useful without showing the information to users.

### Show errors

As validation happens, VRx Form is continually checking to see if the fields in the form are valid. As it does this, it is compiling errors in the `errors` object on every VRx Form object. In the case of this walk through `this.messageForm.errors`.

To view those errors create a computed method to retrieve the error and create a div to show the error when present:

```vue{10-12,52-55}
<template>
  <!-- pass in the VRXForm object into the v-form directive -->

  <form v-form="messageForm">
    <!-- all form fields must have v-form-field and v-model to work -->
    <input name="message.note" type="text" 
      v-form-field
      v-model="message.note">
    <!-- display an error -->
    <div v-if="noteError">
      {{ noteError }}
    </div>
    <div>
      <button @click="submit" :disabled="!messageForm.isValid">Submit Message</button>
    </div>
  </form>
</template>
<script>
// provides an object with built in validators
import { VRXFormValidatorTypes } from 'vrx-form';
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
      // This is how a validator is set
      .setValidations({
        'note': [{
          type: VRXFormValidatorTypes.MIN_LENGTH,
          validation: 8,
          message: 'Not enough characters. Needs to be at least 8',
        }],
      })
      .init();
  },
  methods: {
    submit() {
      console.log('message data', this.message);
      // can clear a form at any point in time.
      this.messageForm.clearForm();
    },
  },
  computed: {
    noteError() {
      return this.messageForm.errors.note
        ? this.messageForm.errors.note.priorityMessage : null;
    }
  }
};
</script>
```

Notice that `priorityMessage` is used to show the error. `priorityMessage` is the first ordered validator for a field. So if there are 3 validators for a field, the first one at position `[0]` will be the `priorityMessage`. You can also retrieve specific error messages by doing something like the following:

```js
noteMinLengthError() {
  return this.messageForm.errors.note
        ? this.messageForm.errors.note[VRXFormValidatorTypes.MIN_LENGTH] : null;
}
```

This library is only as powerful as its ability to valdate. Keep reading to learn about the built in validators as well as how to create custom validations.
