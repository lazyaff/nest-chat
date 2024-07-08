import {
  IsNotEmpty,
  IsString,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsDifferent', async: false })
export class IsDifferentConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value !== relatedValue;
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `$property must not be equal to ${relatedPropertyName}`;
  }
}

export class SendChatRequest {
  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsDifferentConstraint, ['sender'])
  receiver: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  deleted: boolean;
  read: boolean;
  createdAt: Date;
  updatedAt: Date;
}
