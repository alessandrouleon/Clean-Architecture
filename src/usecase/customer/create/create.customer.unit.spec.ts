import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
    name: "John Doe",
    address: {
        street: "Street 1",
        number: 123,
        zip: "12345",
        city: "City"
    }
};
const MockCustomerRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};


describe('Create Customer Use Case Unit Tests', () => {
    it('should create a customer successfully', async () => {
        const customerRepository = MockCustomerRepository();
        const createCustomerUsecase = new CreateCustomerUseCase(customerRepository);
        const output = await createCustomerUsecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city
            },
        });
    });

    it('should throw an error when name is missing', async () => {
        const customerRepository = MockCustomerRepository();
        const createCustomerUsecase = new CreateCustomerUseCase(customerRepository);

        input.name = '';
        await expect(createCustomerUsecase.execute(input)).rejects.toThrow("Name is required");
    });

    it('should throw an error when street is missing', async () => {
        const customerRepository = MockCustomerRepository();
        const createCustomerUsecase = new CreateCustomerUseCase(customerRepository);

        input.name = 'John Doe';
        input.address.street = '';
        await expect(createCustomerUsecase.execute(input)).rejects.toThrow("Street is required");
    });
});