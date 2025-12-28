import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/valoe-object/adress";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
    "Customer 1",
    new Address(
        "Street 1",
        123,
        "12345",
        "City 1"
    )
);

const customer2 = CustomerFactory.createWithAddress(
    "Customer 2",
    new Address(
        "Street 2",
        456,
        "67890",
        "City 2"
    )
);

const MockRepository = () => {
    return {
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
    };
};

describe("Unit test list customer use case", () => {
    it("should list all customers", async () => {
        const customerRepository = MockRepository();
        const usecase = new ListCustomerUseCase(customerRepository);

        const output = await usecase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers).toEqual([
            {
                id: customer1.id,
                name: customer1.name,
                address: {
                    street: customer1.address.street,
                    number: customer1.address.number,
                    zip: customer1.address.zip,
                    city: customer1.address.city,
                },
            },
            {
                id: customer2.id,
                name: customer2.name,
                address: {
                    street: customer2.address.street,
                    number: customer2.address.number,
                    zip: customer2.address.zip,
                    city: customer2.address.city,
                },
            },
        ]);
    });
});