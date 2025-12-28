import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/valoe-object/adress";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John Doe");
const address = new Address("Street 1", 123, "12345", "City");
customer.changeAddress(address);

const MockCustomerRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe('Teste unitário find customer use case', () => {

    it('should find a customer', async () => {

        const customerRepository = MockCustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        customer.changeAddress(address);
        await customerRepository.create(customer);

        const input = {
            id: "123"
        };

        const output = {
            id: "123",
            name: "John Doe",
            address: {
                street: "Street 1",
                number: 123,
                zip: "12345",
                city: "City"
            },
            active: false,
            rewardPoints: 0
        };
        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });

    it('should throw an error when customer is not found', async () => {

        const customerRepository = MockCustomerRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        });
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "123"
        };

        await expect(usecase.execute(input)).rejects.toThrow("Customer not found");
    });
});