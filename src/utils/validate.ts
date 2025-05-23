import Ajv, { Schema } from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors"; 

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
addErrors(ajv); 

interface IValidator {
  isValid: boolean;
  errors: string[];
}

export const validate = (customSchema: Schema, data: object): IValidator => {
  const validate = ajv.compile(customSchema);
  const isValid = validate(data);

  const errors = validate.errors
    ? validate.errors.map((e) => e.message || `${e.instancePath} error`)
    : [];

  return { isValid, errors };
};

export default validate;