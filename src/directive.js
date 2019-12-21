/* eslint-disable no-param-reassign */
/* eslint-disable no-case-declarations */
import Vue from 'vue';
import VueFormHandler from './form/form-handler';

const submitState = new WeakMap();

Vue.directive('form', {
  bind(el, binding) {
    const { arg, value } = binding;
    switch (arg) {
      case 'submit':
        submitState.set(el, value);
        break;
      case 'field':
        el.dataset.formFieldName = value;
        break;
      default:
        break;
    }
  },
  inserted(el, binding, vnode) {
    const { arg, expression } = binding;
    if (!arg) {
      if (vnode.tag === 'form') {
        new VueFormHandler(el, vnode.context, expression, submitState)
          .init();
      } else {
        throw new Error('vue-form can only be used on a form-tag');
      }
    }
  },
});
