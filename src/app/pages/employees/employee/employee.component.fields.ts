import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { ValidRoles } from "src/app/types/auth";

export interface EmployeeFieldsModel {
    name: string;
    email: string;
    role: ValidRoles;
}

export const employeeFormOptions: FormlyFormOptions = {
    formState: {
        isNew: true
    }
};

export const employeeViewFields: FormlyFieldConfig[] = [
    {
        key: 'name',
        type: 'input',
        props: {
            label: 'Nombre',
            placeholder: 'Ingrese el nombre del empleado',
            required: true
        },
        validators: {
            validation : ['text-only']
        }
    },
    {
        key: 'email',
        type: 'input',
        props: {
            label: 'Email',
            placeholder: 'Ingrese el email del empleado',
            required: true,
            type: 'email'
        },
        validators: {
            validation: ['email']
        },
        asyncValidators: {
            validation: ['existent-email']
        }
    },
    {
        key: 'role',
        type: 'select',
        props: {
            label: 'Rol',
            placeholder: 'Seleccione un rol',
            required: true,
            options: [
                { label: 'Seleccione un rol', value: null },
                { label: 'Administrador', value: ValidRoles.ADMIN },
                { label: 'Mecanico', value: ValidRoles.MECHANIC }
            ]
        }
    }
]
