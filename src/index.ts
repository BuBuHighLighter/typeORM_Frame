import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes/index";
import {User} from "./entity/User";
import { RoutesModal } from './modals/routes';

import { Log } from './middlewares/log';
import { fd } from './middlewares/fd';
import { RequestMiddleware } from './middlewares/requestUuid';

createConnection().then(async connection => {

    // create express app
    const app = express();

    // 2.给req一些写日志的方法（没考虑清楚）

    app.use(bodyParser.json());
    // 1.给req一个uuid
    app.use(RequestMiddleware.requestInfo());
    app.use(fd());
    // app.use(fd())
    // app.use(Log.middleware());

    // register express routes from defined application routes
    Routes.forEach((route: RoutesModal)  => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                // 这里需要改一下，写日志
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // 这里写中间件
    // app.use(fd());

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

}).catch(error => console.log(error));
