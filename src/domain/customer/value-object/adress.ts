import Entity from "../../@shared/entity/entity.abstract";
import NotificationErros from "../../@shared/notification/notification.error";
import AddressValidatorFactory from "../factory/adress.validatror";

export class Address extends Entity {
    private _street: string;
    private _number: number;
    private _zip: string;
    private _city: string;

    constructor(street: string, number: number, zip: string, city: string) {
        super();
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;
        this.validate();

        if (this.notifications.hasErrors()) {
            throw new NotificationErros(this.notifications.getErrors());
        }
    }

    validate(): void {
        AddressValidatorFactory.create().validate(this);
    }
    get street(): string {
        return this._street;
    }
    get number(): number {
        return this._number;
    }
    get zip(): string {
        return this._zip;
    }
    get city(): string {
        return this._city;
    }

    set street(street: string) {
        this._street = street;
    }
    set number(number: number) {
        this._number = number;
    }
    set zip(zip: string) {
        this._zip = zip;
    }
    set city(city: string) {
        this._city = city;
    }


    toString(): string {
        return `${this._street}, ${this._number}, ${this._zip}, ${this._city}`;
    }

}