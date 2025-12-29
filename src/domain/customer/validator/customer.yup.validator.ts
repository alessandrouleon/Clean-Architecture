import * as yup from 'yup';
import ValidatorInterface from "../../@shared/validator/validator.interface";
import { Customer } from "../entity/customer";

export default class CustomerYupValidator implements ValidatorInterface<Customer> {
    validate(entity: Customer): void {
        try {
            const schema = yup.object().shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required"),
                active: yup.boolean().required("Active is required"),
                rewardPoints: yup.number().required("Reward Points is required"),
            });

            schema.validateSync({
                id: entity.id,
                name: entity.name,
                active: entity.isActive(),
                rewardPoints: entity.rewardPoints,
            }, { abortEarly: false });
        } catch (err) {
            const e = err as yup.ValidationError;
            e.errors.forEach((error: string) => {
                entity.notification.addError({
                    context: "customer",
                    message: error,
                });
            });
        }

    }
}