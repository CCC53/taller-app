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
            required: true,
            maxLength: 50
        },
        validators: {
            validation : ['text-only', 'blank-space']
        }
    },
    {
        key: 'email',
        type: 'input',
        props: {
            label: 'Email',
            placeholder: 'Ingrese el email del empleado',
            required: true,
            type: 'email',
            maxLength: 50
        },
        validators: {
            validation: ['email', 'valid-domain']
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
                { label: 'Mecánico', value: ValidRoles.MECHANIC }
            ]
        }
    }
]
