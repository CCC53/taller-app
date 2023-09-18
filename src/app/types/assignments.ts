import { FormlyFieldConfig } from "@ngx-formly/core";
import { Employee } from "./employees";
import { SparePart } from "./spare-parts";

export interface SelectOption {
    value: string;
    label: string;
}

export interface FindVehiclesSelect {
    vehiclesSelect: SelectOption[];
}

export interface FindEmployeesAviableSelect {
    employeesAviable: SelectOption[];
}

export interface FindSparePartsAviableSelect {
    sparePartsAviable: SelectOption[];
}

export interface AssignmentEmployeeResponse {
    assigned: Employee;
}

export interface AssignmentSparePartResponse {
    assigned: SparePart;
}

export interface RemoveFromServiceResponse {
    removed: boolean;
}

export interface AssignmentsModalData {
    fields: FormlyFieldConfig[];
    type: 'employee' | 'spare-part';
}