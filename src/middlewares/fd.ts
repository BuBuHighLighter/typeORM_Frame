export function fd(): any {
    return function(req, res, next): void {
        console.log('fd ' + req.uuid);
        next();
    }
}