import {Request, Response} from "express";
import {DateUtils} from '../utils/date';
import * as Url from 'url';

/**
 * 封装请求信息(request info)的类
 * 先把这里给到req/res中
 */
export class RequestInfo {
    // 请求IP
    public ip: string;

    // 请求时间
    public datetime: string;

    // 给请求者分配一个uuid
    public uuid: string;

    // 请求方法
    public method: string;

    // 请求路由
    public path: string;

    // 请求参数
    public body: any;

    constructor(req: Request, res: Response) {
        this.ip = req.headers['x-forwarded-for'] ||         // 判断是否有反向代理 IP
        req.connection.remoteAddress ||                     // 判断 connection 的远程 IP
        req.socket.remoteAddress ||                         // 判断后端的 socket 的 IP
        req.connection.socket.remoteAddress;

        if (this.ip.includes('::ffff:'))
            this.ip = this.ip.replace(/^:*f*:/, '');

        this.datetime = DateUtils.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss:S');

        this.uuid = req.uuid;

        this.method = req.method.toLowerCase();

        this.path = Url.parse(req.url).pathname;

        if ('get' === this.method) {
            this.body = JSON.parse(JSON.stringify(req.query));
        } else {
            this.body = JSON.parse(JSON.stringify(req.body));
        }
    }
}