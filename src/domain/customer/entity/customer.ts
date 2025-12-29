import Entity from "../../@shared/entity/entity.abstract";
import NotificationErros from "../../@shared/notification/notification.error";
import { Address } from "../valoe-object/adress";

export class Customer extends Entity {
    private _name: string;
    private _address?: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this.id = id;
        this._name = name;

        this.validate();

        if (this.notifications.hasErrors()) {
            throw new NotificationErros(this.notifications.getErrors());
        }
    }

    validate(): void {
        if (this.id.length === 0) {
            this.notifications.addError({
                context: "customer", message: "Id is required",
            });
        }
        if (this._name.length === 0) {
            this.notifications.addError({
                context: "customer", message: "Name is required",
            });
        }
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