import {UserController} from "../controller/UserController";

export const Users = [{
    method: "get",
    route: "/users",
    action: "all",
    controller: UserController,
}, {
    method: "get",
    route: "/users/:id",
    action: "one",
    controller: UserController,
}, {
    method: "post",
    route: "/users",
    action: "save",
    controller: UserController,
}, {
    method: "delete",
    route: "/users/:id",
    action: "remove",
    controller: UserController,
}, {
    method: "post",
    route: "/fd",
    action: "fd",
    controller: UserController,
}, {
    method: "put",
    route: "/fd",
    action: "fd",
    controller: UserController,
}, {
    method: "get",
    route: "/fd",
    action: "fd",
    controller: UserController,
}, ];