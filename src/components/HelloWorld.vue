<template>
<div>
  <form v-form="helloForm">
    <div>
      <label for="myText">My Text</label>
      <input type="text" v-form:field="'myText'" />
      <p v-if="helloForm.errors.myText && helloForm.errors.myText.priorityMessage">
        {{helloForm.errors.myText.priorityMessage}}
      </p>
    </div>
    <div>
      <label for="myOtherText">Other Text</label>
      <input type="text" v-form:field="'myOtherText.myText'" />
      <p v-if="helloForm.errors &&
        helloForm.errors.myOtherText &&
        helloForm.errors.myOtherText.myText
        && helloForm.errors.myOtherText.myText.priorityMessage">
        {{helloForm.errors.myOtherText.myText.priorityMessage}}
      </p>
    </div>
    <div>
      <label for="goofyText">Goofy Text</label>
      <input type="text" v-form:field="'goofyText'" />
      <p v-if="helloForm.errors && helloForm.errors.goofyText
        && helloForm.errors.goofyText.priorityMessage">
        {{helloForm.errors.goofyText.priorityMessage}}
      </p>
    </div>
    <div>
      <button :disabled="!helloForm.isValid">My Valid Button</button>
    </div>
  </form>

  <form v-form="helloForm2">
    <div>
      <label for="myText">My Text</label>
      <input type="text" v-form:field="'myText'" />
      <p v-if="helloForm2.errors.myText && helloForm2.errors.myText.priorityMessage">
        {{helloForm2.errors.myText.priorityMessage}}
      </p>
    </div>
    <div>
      <label for="myOtherText">Other Text</label>
      <input type="text" v-form:field="'myOtherText.myText'" />
      <p v-if="helloForm2.errors &&
        helloForm2.errors.myOtherText &&
        helloForm2.errors.myOtherText.myText
        && helloForm2.errors.myOtherText.myText.priorityMessage">
        {{helloForm2.errors.myOtherText.myText.priorityMessage}}
      </p>
    </div>
    <div>
      <label for="goofyText">Goofy Text</label>
      <input type="text" v-form:field="'goofyText'" />
      <p v-if="helloForm2.errors && helloForm2.errors.goofyText
        && helloForm2.errors.goofyText.priorityMessage">
        {{helloForm2.errors.goofyText.priorityMessage}}
      </p>
    </div>
    <div>
      <button :disabled="!helloForm2.isValid">My Valid Button</button>
    </div>
  </form>
</div>
</template>

<script>
import VueRxForm from '@/form/form';
import VueFormCustomValidator from '@/validators/custom-validator';

class GoofyValidator extends VueFormCustomValidator {
  constructor(message) {
    super('goofy', message);
  }

  // eslint-disable-next-line class-methods-use-this
  validate(value) {
    return value === 'GOOFY';
  }
}

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
        goofyText: [{
          type: GoofyValidator,
          message: 'Should be exactly GOOFY',
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
      }).setSubmit(this.submit1);

    this.helloForm2
      .setFormData(this.hello2)
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
        goofyText: [{
          type: GoofyValidator,
          message: 'Should be exactly GOOFY',
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
      }).setSubmit(this.submit2);
  },
  methods: {
    submit1(data) {
      console.log(data);
      this.helloForm.clearForm();
    },
    submit2(data) {
      console.log(data);
      this.helloForm2.clearForm();
    },
  },
  data() {
    return {
      hello: {
        myText: 'N',
        myOtherText: {
          myText: '',
        },
        goofyText: '',
      },
      hello2: {
        myText: '',
        myOtherText: {
          myText: '',
        },
        goofyText: '',
      },
      helloForm: new VueRxForm(),
      helloForm2: new VueRxForm(),
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
