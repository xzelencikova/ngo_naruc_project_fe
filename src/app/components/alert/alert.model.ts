export class Alert {
    type: AlertType = AlertType.success;
    message?: string;
    title?: string;
    id: string = "";
    delay: number = 0;
    keepAfterRouteChange: boolean = true;
    isVisible?: boolean;
    userData: any;
    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
    }
}

export enum AlertType {
    success = "success",
    error = "error",
    info = "info",
    warning = "warning"
}

export enum PositiionType {
    TopCenter = 0,
    TopLeft = 1,
    TopRight = 2,
    BottomCenter = 3,
    BottomLeft = 4,
    BottomRight = 5,
    Middle = 6,
}
