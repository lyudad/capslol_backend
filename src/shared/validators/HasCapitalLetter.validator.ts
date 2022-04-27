import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export default class HasCapitalLetterConstrain
  implements ValidatorConstraintInterface
{
  validate(string: string) {
    if (!string) {
      return false;
    }
    const hasCapitalLetter = string.match(/[A-Z]+/g);

    if (hasCapitalLetter) {
      return true;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must contain at least one capital letter`;
  }
}

export function HasCapitalLetter(validationOptions?: ValidationOptions) {
  return function register(object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: HasCapitalLetterConstrain,
    });
  };
}
