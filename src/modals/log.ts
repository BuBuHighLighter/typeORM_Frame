import { DateUtils } from '../utils/date';
import * as Colors from 'colors';
/**
 * 封装写入日志的日志信息类
 */
export class Log{
    public datetime: string;

    public ip: string;

    public method: string;

    public data: string;

    public path: string;

    public uuid: string;

    public extendInfo: string;

    constructor(
        uuid: string,
        ip: string,
        data: string,
        datetime: string = DateUtils.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss S'),
        path: string = '-',
        method: string = '-',
        extendInfo: string = ''
    ) {
        this.uuid = uuid;
        this.ip = ip;
        this.data = data;
        this.datetime = datetime;
        this.path = path;
        this.method = method;
        this.extendInfo = extendInfo;
    }

    /**
     * 返回字符串
     */
    public toString(): string {
        return `[${this.datetime}] (${this.uuid}) ${this.method} ${this.path} ${this.data} <${this.extendInfo}>`;
    }

    /**
     * 返回打印在控制台的字符串
     */
    public pretty(): string {
        return `[${Colors.blue(this.datetime)}] (${Colors.green(this.uuid)}) ${Colors.red(this.method)} ${Colors.yellow(this.path)} ${this.data} <${this.extendInfo}>`;
    }
}