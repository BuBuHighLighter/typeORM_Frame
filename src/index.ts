import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { Routes } from "./routes/index";
import { User } from "./entity/User";
import { RoutesModal } from './modals/routes';

import { fd } from './middlewares/fd';
import { RequestMiddleware } from './middlewares/request';
import { Log } from './modals/log';
import { Config } from './config';

createConnection().then(async connection => {

    // create express app
    const app = express();


    app.use(bodyParser.json());
    app.use(RequestMiddleware.requestInfo());
    app.use(RequestMiddleware.responseSend());
    if ('DEV' === Config.ENV.toUpperCase()) {
        app.use(fd());
    }

    // register express routes from defined application routes
    Routes.forEach((route: RoutesModal) => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            let result;
            try {
                result = (new (route.controller as any))[route.action](req, res, next);
            } catch (error) {
                return res.error(error, Config.ENV);
            }
            if (result instanceof Promise) {
                result.then(
                    (result) => {
                        result !== null && result !== undefined ? res.success(result) : undefined
                    });

            } else if (result !== null && result !== undefined) {
                res.success(result);
            }
        });
    });

    // 处理404的中间件
    app.use(RequestMiddleware.NotFound());

    // start express server
    app.listen(3000);

    // // insert new users for test
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Timber",
    //     lastName: "Saw",
    //     age: 27
    // }));
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Phantom",
    //     lastName: "Assassin",
    //     age: 24
    // }));

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch((error) => {
    console.log('fd error');
    console.log(error);
});
