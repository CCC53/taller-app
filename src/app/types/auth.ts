import { Employee } from "./employees";
import { Route } from "./shared";

export interface LoginRes {
    routes: Route[];
}

export enum ValidRoles {
    ADMIN = "admin",
    MECHANIC = "mechanic"
}

export interface TokenDecoded {
    id: string;
    name: string;
    email: string;
    exp: number;
    role: ValidRoles;
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