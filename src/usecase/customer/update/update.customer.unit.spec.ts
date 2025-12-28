import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import { Address } from "../../../domain/customer/valoe-object/adress";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    "John Doe",
    new Address("123 Main St", 100, "12345", "Anytown")
);

const input = {
    id: customer.id,
    name: "Jane Doe",
    address: {
        street: "456 Elm St",
        number: 200,
        zip: "67890",
        city: "Othertown"
    }
};

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        update: jest.fn()
    };
};


describe("Unit test for customer update use case", () => {
    it("should update a customer", async () => {
        const customerRepository = MockRepository();
        const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

        const output = await customerUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
});
