<template>
<div>
  <form v-form="profileForm">
    <div class="input-block">
      <label for="profile.username">Username*</label>
      <input
        name="profile.username"
        type="text"
        v-model="profile.username"
        v-form-field >
      <p class="hint">
        <span class="errors" v-if="usernameError">{{usernameError}}</span>
        <span v-else>Hint: At least 3 characters long</span>
      </p>
    </div>
    <div class="input-block">
      <label for="profile.password">Password*</label>
      <input
        name="profile.password"
        type="password"
        v-model="profile.password"
        v-form-field >
      <p class="hint">
        <span class="errors" v-if="passwordError">{{passwordError}}</span>
        <span v-else>Hint: Must contain letters and numbers</span>
      </p>
    </div>
    <div class="input-block">
      <label for="profile.fullName">Full name</label>
      <input
        name="profile.fullName"
        type="text"
        v-model="profile.fullName"
        v-form-field >
      <p class="hint">
        <span class="errors" v-if="fullNameError">{{fullNameError}}</span>
        <span v-else>Hint: Optional</span>
      </p>
    </div>
    <div class="input-block">
      <label for="profile.bio">Bio*</label>
      <textarea
        name="profile.bio"
        v-model="profile.bio"
        rows="4"
        v-form-field ></textarea>
      <p class="hint">
        <span class="errors" v-if="bioError">{{bioError}}</span>
        <span v-else>Hint: Must be at least 10 characters long.</span>
      </p>
    </div>
    <div class="input-block">
      <label for="profile.agree">
        <input
          type="checkbox"
          name="profile.agree"
          v-model="profile.agree"
          v-form-field
          active-error
          />
          Do you agree to the terms and conditions?</label>
      <p class="hint">
        <span class="errors" v-if="agreeError">{{agreeError}}</span>
        <span v-else>Hint: Must check the box to continue.</span>
      </p>
    </div>
    <div class="input-block">
      <label for="profile.hear">
        <select
          name="profile.hear"
          v-model="profile.hear"
          v-form-field
          active-error
          >
          <option></option>
          <option value="google">Google</option>
          <option value="yahoo">Yahoo</option>
          <option value="google">Friend</option>
          <option value="other">Other</option>
        </select>
        How did you hear about us?</label>
      <p class="hint">
        <span class="errors" v-if="hearError">{{hearError}}</span>
        <span v-else>Hint: Must select one.</span>
      </p>
    </div>
    <div class="input-block">
      <label for="profile.receiveEmail">Would you like to receive emails?</label>
      <input
          type="radio"
          name="profile.receiveEmail"
          v-model="profile.receiveEmail"
          v-form-field
          active-error
          value="true"
          /> <span>Yes</span>
      <input
          type="radio"
          name="profile.receiveEmail"
          v-model="profile.receiveEmail"
          v-form-field
          active-error
          value="false"
          /> <span>No</span>
      <p class="hint">
        <span class="errors" v-if="agreeError">{{agreeError}}</span>
        <span v-else>Hint: Must check the box to continue.</span>
      </p>
    </div>
    <button @click="submit" :disabled="!profileForm.isValid">Submit</button>
  </form>
  <div>
    <h3>Last Result:</h3>
    <pre class="language-json">{{ profileValue | prettyJSON }}</pre>
  </div>
</div>
</template>

<script>
import profileValidations from '../validations/profile-validations';
export default {
  data() {
    return {
      profileForm: this.$createForm(),
      profile: {
        username: null,
        password: null,
        fullName: null,
        bio: null,
        agree: null,
        hear: null,
        receiveEmail: null
      },
      profileValue: null
    }
  },
  mounted() {
    this.profileValue = this.profile;
    this.profileForm
      .setValidations(profileValidations)
      .init();
  },
  methods: {
    submit(){
      this.profileValue = Object.assign({}, this.profile);
      this.profileForm.clearForm();
    }
  },
  computed: {
    usernameError() {
      return this.profileForm.errors.username
        ? this.profileForm.errors.username.priorityMessage
        : null;
    },
    passwordError() {
      return this.profileForm.errors.password
        ? this.profileForm.errors.password.priorityMessage
        : null;
    },
    bioError() {
      return this.profileForm.errors.bio
        ? this.profileForm.errors.bio.priorityMessage
        : null;
    },
    fullNameError() {
      return this.profileForm.errors.fullName
        ? this.profileForm.errors.fullName.priorityMessage
        : null;
    },
    agreeError() {
      return this.profileForm.errors.agree
        ? this.profileForm.errors.agree.priorityMessage
        : null;
    },
    hearError() {
      return this.profileForm.errors.hear
        ? this.profileForm.errors.hear.priorityMessage
        : null;
    },
    receiveEmailError() {
      return this.profileForm.errors.receiveEmail
        ? this.profileForm.errors.receiveEmail.priorityMessage
        : null;
    }
  },
  filters: {
    prettyJSON: function(value) {
      return JSON.stringify(value, null, 2);
    }
  }
}
</script>

<style scoped>
input[invalid], textarea[invalid], select[invalid] {
  border: 1px solid #e74c3c !important;
}

.errors {
  color: #e74c3c;
}
.result{
  color: white;
}
p.hint {
  margin: 0;
  font-size: 0.75rem;
  font-style: italic;
  height: 1rem;
}
.input-block {
  position: relative;
  box-sizing: border-box;
  min-height: 6rem;
  margin-bottom: 0.5rem;
}
input:not([type="radio"]), textarea, select {
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  min-height: 2rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  border:1px solid #cccccc;
  width: 50%;
}
input[name="profile.agree"] {
  margin-top: 2rem !important;
  width: inherit;
}

label:not([for="profile.agree"]) {
  display: block;
  margin-bottom: 0.5rem;
}
button {
  display: inline-block;
  border-radius: 0.25rem;
  border: none;
  box-sizing: border-box;
  height: 2rem;
  padding: 0.25rem 2rem;
  margin: 0.5rem 0;
  text-decoration: none;
  background: #27ae60;
  color: #ffffff;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  transition: background 250ms ease-in-out,
              transform 150ms ease;
  -webkit-appearance: none;
  -moz-appearance: none;
}

button:hover,
button:focus, :not(button:disabled) {
    background: #0053ba;
}

button:focus, :not(button:disabled) {
    outline: 1px solid #fff;
    outline-offset: -0.25rem;
}

button:active, :not(button:disabled) {
    transform: scale(0.99);
}
button:disabled {
  opacity: .5;
  cursor: not-allowed;
}
</style>
