import request from 'supertest';
import { app, sequelize } from '../express';

describe('Customer E2E Customer Tests', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it('should create a customer', async () => {
        const response = await request(app)
            .post('/customer')
            .send({
                name: 'John Doe',
                address: {
                    street: '123 Main St',
                    city: 'Anytown',
                    number: 123,
                    zip: '12345'
                }
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe('John Doe');
        expect(response.body.address.street).toBe('123 Main St');
    });

    it('should not create a customer with invalid data', async () => {
        const response = await request(app)
            .post('/customer')
            .send({
                name: '',
                // address: {
                //     street: '123 Main St',
                //     city: 'Anytown',
                //     number: 123,
                //     zip: '12345'
                // }
            });

        expect(response.status).toBe(500);
    });

});