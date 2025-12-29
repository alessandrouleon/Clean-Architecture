import * as yup from 'yup';
import ValidatorInterface from "../../@shared/validator/validator.interface";
import { Address } from "../value-object/adress";

export default class AddressYupValidator implements ValidatorInterface<Address> {
    validate(entity: Address): void {
        try {
            const schema = yup.object().shape({
                street: yup.string().required("Street is required"),
                number: yup.number().required("Number is required"),
                zip: yup.string().required("Zip is required"),
                city: yup.string().required("City is required"),
            });
            schema.validateSync({
                street: entity.street,
                number: entity.number,
                zip: entity.zip,
                city: entity.city,
            }, { abortEarly: false });
        } catch (err) {
            const e = err as yup.ValidationError;
            e.errors.forEach((error: string) => {
                entity.notification.addError({
                    context: "adress",
                    message: error,
                });
            });
        }
    }
}