export class Address {
    private _street: string;
    private _number: number;
    private _zip: string;
    private _city: string;

    constructor(street: string, number: number, zip: string, city: string) {
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;
        this.validate();
    }

    validate(): void {
        if (this._street.length === 0) {
            throw new Error("Street is required");
        }
        if (this._number <= 0) {
            throw new Error("Number must be greater than zero");
        }
        if (this._zip.length === 0) {
            throw new Error("ZIP code is required");
        }
        if (this._city.length === 0) {
            throw new Error("City is required");
        }
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