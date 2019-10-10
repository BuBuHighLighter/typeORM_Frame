import { RoutesModal } from '../modals/routes';

import {Users} from './users';

// 合并每个数组
function concatRoutes(...args: any[]): RoutesModal[] {
    const routes: RoutesModal[] = [];
    args.map( (item: {route: string, action: string, method: string}[]) => {
        item.map( a => {
            routes.push(new RoutesModal(a.method, a.route, a.action));
        })
    })
    return routes;
}
export const Routes = concatRoutes(Users);