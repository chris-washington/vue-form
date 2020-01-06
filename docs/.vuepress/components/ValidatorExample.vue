<template>
<div style="height:5rem">
  <slot />
  <form v-form="commentForm">
    <input  ref="input" style="height: 1.5rem" v-model="comment.message" v-form-field:inputEvent="'input'">
    <span>
      <button @click="submit" style="height: 1.5rem; margin-left:0.25rem" :disabled="!commentForm.isValid">My Valid Button</button>
    </span>
    <p style="font-size: 0.75rem; color:red;" v-show="messageError">
        {{ messageError }}
    </p>
    <p style="font-size: 0.75rem;" v-if="value && !messageError">Last Submitted Value: {{value}}</p>
  </form>
</div>
</template>

<script>
import Vue from 'vue';

import { VueFormValidatorTypes, VueFormCustomValidator } from 'vue-form';

class GoofyValidator extends VueFormCustomValidator {
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

export default {
  name: 'ValidatorExample',
  props: {
    msg: String,
    validation: undefined,
    validator: undefined,
    active: false,
    options: Object
  },
  mounted() {
    let { validator } = this;

    const { input } = this.$refs;

    if (this.active) {
      input.setAttribute('active-error', '');
    }

    if (validator === 'custom') {
      validator = GoofyValidator;
    }

    this.commentForm
      .setValidations({
        message: [{
          type: validator,
          validation: this.validation,
          message: this.msg,
          options: this.options
        }]
      })
      .init();
  },
  methods: {
    submit() {
      this.value = this.comment.message;
      this.commentForm.clearForm();
    },
  },
  computed: {
    messageError() {
      return this.commentForm.errors.message
        ? this.commentForm.errors.message.priorityMessage : null;
    },
  },
  data() {
    return {
      comment: {
        message: null,
      },
      commentForm: this.$createForm(),
      value: null
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  width: 50%;
}
</style>
