/**
 * 封装路由的类
 */
export class RoutesModal {
    public method: string;

    public route: string;

    public action: string;

    public controller: any;

    constructor(method: string,
                route: string,
                action: string,
                controller: any) {
                    this.method = method;
                    this.route = route;
                    this.action = action;
                    this.controller = controller;
                }
}

