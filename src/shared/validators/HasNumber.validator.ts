import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export default class HasNumberConstrain
  implements ValidatorConstraintInterface
{
  validate(string: string) {
    if (!string) {
      return false;
    }

    const hasNumber = string.match(/[0-9]+/g);
    if (hasNumber) {
      return true;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must contain at least one number`;
  }
}

export function HasNumber(validationOptions?: ValidationOptions) {
  return function register(object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: HasNumberConstrain,
    });
  };
}
