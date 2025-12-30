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
                name: ''
            });

        expect(response.status).toBe(500);
    });

    it('should list all customers', async () => {
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

        const response2 = await request(app)
            .post('/customer')
            .send({
                name: 'Jane Smith',
                address: {
                    street: '456 Oak St',
                    city: 'Othertown',
                    number: 456,
                    zip: '67890'
                }
            });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get('/customer').send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.customers.length).toBe(2);

        const customer = listResponse.body.customers[0];
        expect(customer.name).toBe('John Doe');
        expect(customer.address.street).toBe('123 Main St');

        const customer2 = listResponse.body.customers[1];
        expect(customer2.name).toBe('Jane Smith');
        expect(customer2.address.street).toBe('456 Oak St');

        //xml
        const listResponseXML = await request(app)
            .get('/customer')
            .set('Accept', 'application/xml')
            .send();

        expect(listResponseXML.status).toBe(200);
        expect(listResponseXML.text).toContain('<?xml version="1.0" encoding="UTF-8"?>');
        expect(listResponseXML.text).toContain('<customers>');
        expect(listResponseXML.text).toContain('<customer>');
        expect(listResponseXML.text).toContain('<name>John Doe</name>');
        expect(listResponseXML.text).toContain('<street>123 Main St</street>');
        expect(listResponseXML.text).toContain('<name>Jane Smith</name>');
        expect(listResponseXML.text).toContain('<street>456 Oak St</street>');
    });

});