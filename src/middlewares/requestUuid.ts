import {Request, Response, NextFunction} from "express";
import * as uuid from 'uuid/v4';
import {Log} from '../middlewares/log';
import {Log as LogModal} from '../modals/log';
import { RequestInfo } from '../modals/requestInfo';

export class RequestMiddleware {
    /**
     * 给每一个req和对应的res分配一个uuid
     */
    public static requestInfo(): any {
        return function (req: Request, res: Response, next: NextFunction): void {
            const requestInfo = new RequestInfo(req, res);
            req.info = requestInfo;
            res.info = requestInfo;
            req.info.uuid = uuid();
            res.info.uuid = req.uuid;
            req.body = req.info.body;
            next();
        }
    }

    /**
     * 封装res返回相应并且写入日志的操作
     */
    public static responseSend(): any{
        return function(req: Request, res: Response, next: NextFunction): void {
            res.success = function(data: string | JSON, extendInfo: string = ''): void {
                if ('string' !== typeof data) {
                    data = JSON.stringify(data);
                }
                const logInfo = new LogModal(
                    res.info.uuid,
                    req.info.ip,
                    data,
                    req.info.datetime,
                    req.info.method,
                    extendInfo);
                Log.write(logInfo);
                res.end(data);
            }
        }
    }
}