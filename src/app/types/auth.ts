import { Employee } from "./employees";
import { Route } from "./shared";

export interface LoginRes {
    routes: Route[];
}

export enum ValidRoles {
    ADMIN = "admin",
    MECHANIC = "mechanic"
}

export interface ValidateAuth {
    valid: boolean;
}

export interface LogoutResponse {
    logout: boolean;
}

export interface MeResponse {
    me: Employee;
}