/* eslint-disable no-case-declarations */
import Vue from 'vue';
import VueFormHandler from './form/handler';

Vue.directive('form-field', {
  bind(el, bindings) {
    const name = bindings.value;
    el.setAttribute('rx-form-field-name', name);
    el.setAttribute('pristine', true);
    el.setAttribute('dirty', false);
  },
});

Vue.directive('form', {
  bind(el, binding, vnode) {
    if (vnode.tag === 'form') {
      new VueFormHandler(el, vnode.context, binding.expression)
        .init();
    } else {
      throw new Error('vue-form can only be used on a form-tag');
    }
  },
});
