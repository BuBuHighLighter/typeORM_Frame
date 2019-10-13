import { Request, Response, NextFunction } from "express";
import * as uuid from 'uuid/v4';
import { Log as LogModal } from '../modals/log';
import { RequestInfo } from '../modals/requestInfo';
import { Config } from '../config';

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
            res.info.uuid = req.info.uuid;
            req.body = req.info.body;
            const logInfo = new LogModal(
                res.info.uuid,
                req.info.ip,
                'string' === typeof req.body ? req.body : JSON.stringify(req.body),
                req.info.datetime,
                req.info.path,
                req.info.method,
            );
            logInfo.writeLog();
            next();
        }
    }

    /**
     * 封装res返回相应并且写入日志的操作
     */
    public static responseSend(): any {
        return function (req: Request, res: Response, next: NextFunction): void {
            res.success = function (data: string | JSON, extendInfo: string = 'success'): void {
                if ('string' !== typeof data) {
                    data = JSON.stringify(data);
                }
                const logInfo = new LogModal(
                    res.info.uuid,
                    req.info.ip,
                    data,
                    req.info.datetime,
                    req.info.path,
                    req.info.method,
                    extendInfo);
                logInfo.writeLog();
                res.end(data);
            };

            res.error = function (error: Error, env: string): void {
                const data = `[${error.name}]\n ${error.message}\n ${error.stack}`;
                const logInfo = new LogModal(
                    res.info.uuid,
                    req.info.ip,
                    data,
                    undefined,
                    req.info.path,
                    req.info.method,
                    'error');
                logInfo.writeLog('error');
                if ('DEV' !== env.toUpperCase()) {
                    return res.end(JSON.stringify({code: req.info.uuid, message: 'error'}));
                } else {
                    res.end(data);
                }
            }
            next();
        }
    }

    /**
     * 封装处理404的中间件
     */
    public static NotFound(): any {
        return function (req: Request, res: Response, next: NextFunction): void {
            const logInfo = new LogModal(
                req.info.uuid,
                req.info.ip,
                '404 Not Found',
                req.info.datetime,
                req.info.path,
                req.info.method,
                '404 Not Found');
            logInfo.writeLog();
            const result = { code: req.info.uuid, message: '404 Not Found' };
            res.end(JSON.stringify(result));

        }
    }
}