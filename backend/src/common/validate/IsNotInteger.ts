import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator"

@ValidatorConstraint({ name: "IsNotInteger", async: false })
export class IsNotInteger implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments) {
        return text && text.match(/^[0-9]+$/) === null
    }

    defaultMessage(args: ValidationArguments) {
        return "Text ($value) contains only numbers!"
    }
}