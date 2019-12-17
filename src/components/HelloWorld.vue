<template>
  <form v-form="helloForm" data-input-event="input"  data-change-event="change">
    <div>
      <label for="myText">My Text</label>
      <input type="text" v-form-field="'myText'" />
      <p v-if="helloForm.errors.myText && helloForm.errors.myText.priorityMessage">
        {{helloForm.errors.myText.priorityMessage}}
      </p>
    </div>
    <div>
      <label for="myOtherText">Other Text</label>
      <input type="text" v-form-field="'myOtherText.myText'" />
      <p v-if="helloForm.errors &&
        helloForm.errors.myOtherText &&
        helloForm.errors.myOtherText.myText
        && helloForm.errors.myOtherText.myText.priorityMessage">
        {{helloForm.errors.myOtherText.myText.priorityMessage}}
      </p>
    </div>
    <div>
      <button :disabled="!helloForm.isValid">My Valid Button</button>
    </div>
  </form>
</template>

<script>
import VueRxForm from '@/form/form';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  beforeMount() {
    this.helloForm
      .setFormData(this.hello)
      .setValidators({
        myText: [{
          type: 'required',
          message: 'hello this is an error',
        },
        {
          type: 'pattern',
          validation: '^(new|New)(.*)',
          message: 'Must begin with the word new or New',
        },
        {
          type: 'minLength',
          validation: 5,
          message: 'has to at least be 5 characters long',
        }],
        'myOtherText.myText': [{
          type: 'required',
          message: 'I need to be present',
        },
        {
          type: 'pattern',
          validation: '^(old|Old)(.*)',
          message: 'Must begin with the word old or Old',
        },
        {
          type: 'minLength',
          validation: 10,
          message: 'has to at least be 10 characters long',
        }],
      });
  },
  data() {
    return {
      hello: {
        myText: '',
        myOtherText: {
          myText: '',
        },
      },
      errors: {},
      helloForm: new VueRxForm(),
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
