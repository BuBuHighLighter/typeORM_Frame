// export function log(): any {
//     return function(req, res, next): void {
//         console.log('hello world');
//         next();
//     }
// }
import {Request, Response, NextFunction} from "express";
import {RequestInfo} from '../modals/requestInfo';
import {Log as LogModal} from '../modals/log';
import * as Fs from 'fs';
import * as Path from 'path';

export class Log {
    // write log into file
    public static write(log: LogModal, file: string = 'info'): void {
        const dir = Path.join(process.cwd(), 'logs');
        const fileDir = Path.join(dir, file);
        if (!Fs.existsSync(dir)) {
            Fs.mkdirSync(dir);
        }

        if (!Fs.existsSync(fileDir)) {
            Fs.mkdirSync(fileDir);
        }

        Fs.writeFileSync(fileDir, log, {flag: 'a+', encoding: 'utf-8'});
        console.log(log.pretty());
    }

    // log middleware
    public static middleware(): any {
        return function(req: Request, res: Response, next: NextFunction) {
            const requestInfo = new RequestInfo(req, res);
        }
    }
}