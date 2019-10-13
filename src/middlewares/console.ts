export function Console(): any {
    return function(req, res, next): void {
        console.log('test ' + req.info.uuid);
        next();
    }
}