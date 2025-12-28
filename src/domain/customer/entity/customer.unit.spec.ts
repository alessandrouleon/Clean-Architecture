import { Address } from "../valoe-object/adress";
import { Customer } from "./customer";

describe('Customer unit test Entity', () => {
    it('should throw error when id is empty', () => {

        expect(() => {
            const customer = new Customer("", "John Doe");
        }).toThrow("ID is required");
    });

    it('should throw error when name is empty', () => {

        expect(() => {
            const customer = new Customer("123", "");
        }).toThrow("Name is required");
    });

    it('should throw error when name is empty', () => {
        //Arrange
        const customer = new Customer("123", "JhonWW");
        //Act
        customer.changeName("Janne");
        //Assert
        expect(customer.name).toBe("Janne");
    });

    it('should activate customer', () => {
        //Arrange
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "12345", "City");
        customer.address = address;
        //Act
        customer.activate();
        //Assert
        expect(customer.isActive()).toBe(true);
    });

    it('should throw error when address is undefined when you try to activate customer', () => {

        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrow = () => {
            return new Error("Address is mandatory to activate a customer");
        };
    });

    it('should deactivate customer', () => {
        //Arrange
        const customer = new Customer("1", "Customer 1");

        //Act
        customer.deactivate();
        //Assert
        expect(customer.isActive()).toBe(false);
    });
    it('should add reward points', () => {
        //Arrange
        const customer = new Customer("1", "Customer 1");

        //Act
        customer.addRewardPoints(10);
        customer.addRewardPoints(10);
        //Assert
        expect(customer.rewardPoints).toBe(20);
    });
});