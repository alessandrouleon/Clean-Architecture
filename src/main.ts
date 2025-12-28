import { OrderItem } from "./domain/checkout/entity/order-item";
import { Address } from "./domain/customer/valoe-object/adress";
import { Customer } from "./domain/entity/customer/customer";
import { Order } from "./domain/entity/order/order";

let customer = new Customer("123", "John Doe");
let address = new Address("Main St", 123, "12345", "Anytown");
customer.address = address;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10);
const item2 = new OrderItem("2", "Item 2", 20);
const orrder = new Order("1", "123", [item1, item2]);