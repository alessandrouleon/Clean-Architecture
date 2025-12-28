import EventHandlerInterface from "../../../@shared/event-handler.interface";
import { ProductCreatedEvent } from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        console.log(`Esse é o primeiro console.log do evento: ProductCreated`);
    }

}