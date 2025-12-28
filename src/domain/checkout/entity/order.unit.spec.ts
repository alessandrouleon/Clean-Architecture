import { Order } from "./order";
import { OrderItem } from "./order-item";

describe('Order unit test Entity', () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            const order = new Order("", "123", []);
        }).toThrow("ID is required");
    });

    it('should throw error when customerId is empty', () => {
        expect(() => {
            const order = new Order("1", "", []);
        }).toThrow("Customer ID is required");
    });

    it('should throw error when items is empty', () => {
        expect(() => {
            const order = new Order("1", "123", []);
        }).toThrow("Items are required");
    });

    it('should calculate total', () => {
        const item1 = new OrderItem("1", "Item 1", 100, "p1", 2);
        const item2 = new OrderItem("2", "Item 2", 200, "p2", 2);
        const order = new Order("1", "123", [item1]);

        let total = order.total();
        expect(total).toBe(200);

        const order2 = new Order("3", "124", [item1, item2]);

        total = order2.total();

        expect(total).toBe(600);
    });

    it('should throw error if the item qtd is less or equal to zero', () => {

        expect(() => {
            const item1 = new OrderItem("1", "Item 1", 100, "p1", 0);
            const order = new Order("1", "123", [item1]);

        }).toThrow("Quantity must be greater than zero");


    });

});