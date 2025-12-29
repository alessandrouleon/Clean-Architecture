import { Sequelize } from 'sequelize-typescript';
import { Order } from '../../../domain/checkout/entity/order';
import { OrderItem } from '../../../domain/checkout/entity/order-item';
import { Customer } from '../../../domain/customer/entity/customer';
import { Address } from '../../../domain/customer/value-object/adress';
import { Product } from '../../../domain/product/entity/product';
import CustomerRepository from '../../customer/repository/customer.repository';
import CustomerModel from '../../customer/repository/sequelize/customer.model';
import OrderItemModel from '../../order/repository/sequelize/order-item.model';
import ProductRepository from '../../product/repository/product.repository';
import ProductModel from '../../product/repository/sequelize/product.model';
import OrderRepository from './order.repository';
import OrderModel from './sequelize/order.model';


describe('OrderRepository test', () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync({ force: true });
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should create an order', async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer('1', 'Customer 1');
        const address = new Address('Main St', 123, '12345', 'Anytown');
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product('1', 'Product 1', 100);
        await productRepository.create(product);


        const orderItem = new OrderItem("1", product.name, product.price, product.id, 1);

        const order = new Order('1', "1", [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);


        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ['items'] });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "1",
            customer_id: "1",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    product_id: orderItem.productId,
                    quantity: orderItem.quantity,
                    order_id: order.id
                }
            ]
        });
    });


});