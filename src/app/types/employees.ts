import { ValidRoles } from "./auth";

export interface Employee {
    id: string;
    name: string;
    email: string;
    role: ValidRoles;
    serviceID?: string;
}

export interface FindEmployeeResponse {
    employee: Employee;
} 

export interface NewEmployeeResponse extends FindEmployeeResponse {}

export interface UpdateEmployeeResponse extends FindEmployeeResponse {}