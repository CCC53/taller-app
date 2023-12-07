import { Employee } from "./employees";
import { SparePart } from "./spare-parts";

export interface Service {
    id: string;
    startDate: Date;
    endDate: Date;
    issue: string;
    vehicleID: string;
    employees: Employee[];
    spareParts: SparePart[];
}

export interface FindServiceResponse {
    service: Service;
}

export interface NewServiceResponse extends FindServiceResponse {}

export interface UpdateServiceResponse extends FindServiceResponse {}