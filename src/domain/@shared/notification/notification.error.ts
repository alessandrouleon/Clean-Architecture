import { NotificationErrosProps } from "./notification";

export default class NotificationErros extends Error {
    constructor(public errors: NotificationErrosProps[]) {
        super();
    }
}
