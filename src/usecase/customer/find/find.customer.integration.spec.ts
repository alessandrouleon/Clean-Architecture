import { Sequelize } from "sequelize-typescript";
import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/adress";
import CustomerRepository from "../../../infrastructure/customer/repository/customer.repository";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import FindCustomerUseCase from "./find.customer.usecase";

describe('Teste unitário find customer use case', () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();

    }); afterEach(async () => {
        await sequelize.close();
    });

    it('should find a customer', async () => {

        const customerRepository = new CustomerRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const customer = new Customer("123", "John Doe");
        const address = new Address("Street 1", 123, "12345", "City");
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
});