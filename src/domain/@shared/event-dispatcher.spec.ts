import SendEmailWhenProductIsCreatedHandler from "../events/product/handler/send-email-when-product-is-created-handler";
import { ProductCreatedEvent } from "../events/product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe('Domain events', () => {
    it('should register an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandle = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandle);

        expect(
            eventDispatcher.getEventHandlers['ProductCreatedEvent']
        ).toBeDefined();
        expect(
            eventDispatcher.getEventHandlers['ProductCreatedEvent'].length
        ).toBe(1);
        expect(
            eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
        ).toMatchObject(eventHandle);

    });

    it('should unregister an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandle = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandle);
        expect(
            eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
        ).toMatchObject(eventHandle);


        eventDispatcher.unregister('ProductCreatedEvent', eventHandle);

        expect(
            eventDispatcher.getEventHandlers['ProductCreatedEvent']
        ).toBeDefined();

        expect(
            eventDispatcher.getEventHandlers['ProductCreatedEvent'].length
        ).toBe(0);
    });

    it('should unregister all event handlers', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandle = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandle);
        expect(
            eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
        ).toMatchObject(eventHandle);

        eventDispatcher.unregisterAll();

        expect(
            eventDispatcher.getEventHandlers['ProductCreatedEvent']
        ).toBe(undefined);
    });

    it('should notify all event handlers', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandle = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandle, 'handle');

        eventDispatcher.register('ProductCreatedEvent', eventHandle);
        expect(
            eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]
        ).toMatchObject(eventHandle);

        const productCreatedEvent = new ProductCreatedEvent({
            name: 'Product 1',
            description: 'Product 1 description',
            price: 10
        });

        //Quando o evento for disparado, o handle deve ser chamado
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });
})