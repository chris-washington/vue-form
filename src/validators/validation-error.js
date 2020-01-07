const getValidationErrorIfPresent = async (validator, value) => {
  let result = validator.validate(value);

  if (Promise.resolve(result) === result) {
    result = await result;
  }

  if (!result) {
    const { type } = validator;
    const message = validator.getMessage();
    const error = {};
    error[type] = message;
    return error;
  }

  return undefined;
};

export default getValidationErrorIfPresent;
