import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

interface IsFileOptions {
  mime: ('image/jpg' | 'image/png' | 'image/jpeg')[];
}
export function IsFile(
  options: IsFileOptions,
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    return registerDecorator({
      name: 'isFile',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (
            value?.mimetype &&
            (options?.mime ?? []).includes(value?.mimetype)
          ) {
            return true;
          }
          return false;
        },
      },
    });
  };
}
