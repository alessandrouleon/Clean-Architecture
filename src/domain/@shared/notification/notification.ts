export type NotificationErros = {
    message: string;
    context: string;
};

export class Notification {
    private errors: NotificationErros[] = [];

    addError(error: NotificationErros): void {
        this.errors.push(error);
    }

    messages(context?: string): string {
        let messages = "";
        this.errors.forEach((error) => {
            if (context === undefined || error.context === context) {
                messages += `${error.context}: ${error.message},`;
            }
        });
        return messages;
    }

}