import { FormlyFieldConfig } from "@ngx-formly/core";

export interface SelectOption {
    value: string;
    label: string;
}

export interface FindVehiclesSelect {
    vehiclesSelect: SelectOption[];
}

export interface FindItemsAviableSelect {
    data: SelectOption[];
}

export interface AssignmentResponse {
    assigned: any;
}

export interface RemoveFromServiceResponse {
    removed: boolean;
}

export interface AssignmentsModalData {
    fields: FormlyFieldConfig[];
    type: 'employee' | 'spare-part';
}