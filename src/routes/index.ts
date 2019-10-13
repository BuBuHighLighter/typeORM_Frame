import { RoutesModal } from '../modals/routes';

import {Users} from './users';

// 合并每个数组
function concatRoutes(...args: any[]): RoutesModal[] {
    const routes: RoutesModal[] = [];
    args.map( (item: RoutesModal[]) => {
        item.map( (item: RoutesModal) => {
            routes.push(new RoutesModal(item.method, item.route, item.action, item.controller));
        })
    })
    return routes;
}
export const Routes = concatRoutes(Users);