import { isNil } from "lodash-es";

const getModelDirective = vnode => {
  if (!isNil(vnode.data) && !isNil(vnode.data.directives)) {
    const model = vnode.data.directives.find(directive => directive.name === "model");

    if (model) {
      return model;
    }
  }

  if (!isNil(vnode.data) && !isNil(vnode.data.model)) {
    return vnode.data.model;
  }

  return undefined;
};

export default getModelDirective;
