import { Customer } from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import InputListCustomerDTO, { OutputListCustomerDTO } from "./list.customer.dto";

export default class ListCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface;

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository;
    }

    async execute(input: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
        const customers = await this.customerRepository.findAll();

        return OutputMapping.toOutput(customers);
    }
}

class OutputMapping {
    static toOutput(customer: Customer[]): OutputListCustomerDTO {
        return {
            customers: customer.map((cust: any) => ({
                id: cust.id,
                name: cust.name,
                address: {
                    street: cust.address.street,
                    number: cust.address.number,
                    zip: cust.address.zip,
                    city: cust.address.city,
                },
            })),
        };
    }
}
