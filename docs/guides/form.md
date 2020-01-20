---
title: Form setup
lang: en-US
---

# Form setup
To `v-form` directive is the starting point of form validation. When initialized it can begin to process validations.

## Initialization

By adding the directive `v-form` to a `form` element and passing it a [VRXForm](/api/#vueform) object, the library can initialize form validations.

::: danger FATAL
If `v-form` does not appear on a `form` element, an error will be thrown.
:::

To initialize the form pass in the [VRXForm](/api/#vueform) object:

```vue{2,15}
<template>
  <form v-form="myForm">
    <!-- omitted -->
  </form>
</template>
<script>
 export default {
   name 'MyForm',
   data() {
     return {
       // can also import VRXForm from 'vrx-form'...
       // and instantiate it like so myForm: new VRXForm()
       myForm: this.$createForm()
     }
   }
 }
</script>
```

The above is the first step in creating validations.

## Custom input event

Some times it is necessary to override the default browser `input` event for the form when the fields contained are custom web components or vue components that dispatch an input event that is not named `input`.

This is done by declaring a second `v-form` directive in an argument named `inputEvent` like the following:

```vue{2}
<template>
  <form v-form="myForm" v-form:inputEvent="'my-input-event'">
    <!-- omitted -->
  </form>
</template>
<script>
 // omitted for this example
</script>
```

The above highlighted code tells VRx Form to listen to events named `my-input-event` for the entire form. This will also help `v-model` know how to set the value properly (which has been a limitation of `v-model` in the past).

::: tip
If you need to override a specific field's input event you can do so as explained [here](fields.html#custom-input-events).
:::

## Dirty and pristine

The [VRXForm](/api#vueform) object knows the state of the object, whether it is dirty or pristine.

Pristine is when the form has never received any type of input from the user. Where as dirty is when the current form values are not equal to their original state.

Pristine and dirty states can be retrieved from `isPristine` and `isDirty` respectively. These two values can be important when we want to let a user know that they are leaving a page with unsaved changes.

Take the following example:

```vue{15-25}
<template>
  <form v-form="myForm" v-form:inputEvent="'my-input-event'">
    <!-- omitted -->
  </form>
</template>
<script>
export default {
  data() {
    return {
      myData: { /** omit **/},
      myDataForm: this.$createForm()
    };
  },
  beforeRouteLeave (to, from, next) {
    // sometimes you may want to use isPristine
    if (this.myDataForm.isDirty) {
      const answer = window.confirm('Do you really want to leave? you have unsaved changes!');
      if (answer) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  }
}
</script>
```

In the above example, you can prevent a route change if the form is dirty and let the user determine if they meant to leave the screen.

::: tip
A very important use case for `isDirty`is for edits. More often than not you will only want to code the form so that it only allows for submitting the form if it is both [valid](#valid) and `isDirty` is equal to true.
:::

## Valid

A [VRXForm](/api#vueform) object can also know the state of the forms validity. This is controlled through the property `isValid`.

Take the following example:

```vue{4}
<template>
  <form v-form="myForm" v-form:inputEvent="'my-input-event'">
    <!-- omitted fields -->
    <button :disabled="!myDataForm.isValid">submit</button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      myData: { /** omit **/},
      myDataForm: this.$createForm()
    };
  }
  /** omitted mounted **/
}
</script>
```

`isValid` can control giving the option for a user to press the submit button, in this particular use case.
