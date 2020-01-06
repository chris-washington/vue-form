---
title: Handling submit
lang: en-US
---

# Handling submit

When a form is submitted, some action needs to take place in order for the code to know that it should do something with the data.

## Form submission

To handle form submission, first define a submit function (can be named anything) in the `methods` section of the component. On the button set the bind to the `click` event and set the value to the method created:

```vue{5,21,23-27}
<template>
  <form v-form="myForm">
    <!-- omitted -->
    <!-- needed for submission -->
    <button @click="submit">Submit</button>
  </form>
</template>
<script>
 export default {
   name 'MyForm',
   data() {
     return {
       myForm: this.$createForm(),
       myFormData: { /** omitted **/}
     }
   },
   mounted() {
     this.myForm
      .setValidations(/** omitted **/)
      .init();
   },
   methods: {
     submit() {
       // check form data
       console.log('my data', this.myFormData);
     }
   }
 }
</script>
```
## Clearing form

If there is a need to clear the form at any point in time you can do so by calling:

```js
// if the form object is myDataForm
this.myDataForm.clearForm();
```
