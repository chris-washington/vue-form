import { constructValidationMessage } from "../helpers/utils/operations";

const getValidationErrorIfPresent = async (validator, value) => {
  let result = validator.validate(value);

  result = await result;

  return constructValidationMessage(result, validator);
};

export default getValidationErrorIfPresent;
