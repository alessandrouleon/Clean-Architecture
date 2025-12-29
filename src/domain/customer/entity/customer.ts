import Entity from "../../@shared/entity/entity.abstract";
import NotificationErros from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import { Address } from "../value-object/adress";

export class Customer extends Entity {
    private _name: string;
    private _address?: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;

        this.validate();

        if (this.notifications.hasErrors()) {
            throw new NotificationErros(this.notifications.getErrors());
        }
    }

    validate(): void {
        CustomerValidatorFactory.create().validate(this);
    }

    changeName(name: string): void {
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address): void {
        this._address = address;
    }

    activate(): void {
        if (this._address === undefined) {
            throw new Error("Address is required");
        }
        this._active = true;
    }
    deactivate(): void {
        this._active = false;
    }

    isActive(): boolean {
        return this._active;
    }

    addRewardPoints(points: number): void {
        this._rewardPoints += points;
    }


    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get name(): string {
        return this._name;
    }

    set address(address: Address) {
        this._address = address;
    }

    get address(): Address {
        return this._address;
    }
}