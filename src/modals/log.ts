import { DateUtils } from '../utils/date';
import * as Colors from 'colors';
import * as Path from 'path';
import * as Fs from 'fs';

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
        return `[${this.datetime}] (${this.uuid}) ${this.method} ${this.path} ${this.data} <${this.extendInfo}>\r\n`;
    }

    /**
     * 返回打印在控制台的字符串
     */
    public pretty(): string {
        return `[${Colors.blue(this.datetime)}] (${Colors.green(this.uuid)}) ${Colors.red(this.method)} ${Colors.yellow(this.path)} ${this.data} <${this.extendInfo}>\n`;
    }

    /**
     * 写入日志
     */
    public writeLog(file: string = 'info'): void {
        const dir = Path.join(process.cwd(), 'logs');
        const fileDir = Path.join(dir, file);
        // 暂时先写死，只能往default文件里写入东西
        const fileName = Path.join(fileDir, 'default.txt');

        if (!Fs.existsSync(dir)) {
            Fs.mkdirSync(dir);
        }

        if (!Fs.existsSync(fileDir)) {
            Fs.mkdirSync(fileDir);
        }

        Fs.writeFileSync(fileName, this.toString(), {flag: 'a+', encoding: 'utf-8'});
        console.log(this.pretty());
    }
}