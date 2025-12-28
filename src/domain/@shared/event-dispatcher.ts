import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {

    private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

    get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
        return this.eventHandlers;
    }


    register(eventName: string, eventHandle: EventHandlerInterface): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
        this.eventHandlers[eventName].push(eventHandle);
    }

    unregister(eventName: string, eventHandle: EventHandlerInterface): void {
        if (this.eventHandlers[eventName]) {
            const index = this.eventHandlers[eventName].indexOf(eventHandle);
            if (index !== -1) {
                this.eventHandlers[eventName].splice(index, 1);
            }
        }
    }
    notify(event: EventInterface): void {
        const eventName = event.constructor.name;
        if (this.eventHandlers[eventName]) {
            this.eventHandlers[eventName].forEach((eventHandler) => {
                eventHandler.handle(event);
            });
        }
    }


    unregisterAll(): void {
        this.eventHandlers = {};
    }

}