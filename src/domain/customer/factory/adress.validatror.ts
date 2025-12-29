import ValidatorInterface from "../../@shared/validator/validator.interface";
import AddressYupValidator from "../validator/adress.yup.validator";
import { Address } from "../value-object/adress";

export default class AddressValidatorFactory {
    static create(): ValidatorInterface<Address> {
        return new AddressYupValidator();
    }
}

