import { FormlyFieldConfig } from "@ngx-formly/core";

export const loginFormFields: FormlyFieldConfig[] = [
    {
        key: 'email',
        type: 'input',
        props: {
            label: 'Email',
            placeholder: 'Ingrese su email',
            required: true,
            type: 'email'
        },
        validators: {
            validation: ['email']
        }
    },
    {
        key: 'password',
        type: 'input',
        props: {
            label: 'Contraseña',
            placeholder: 'Ingrese su contraseña',
            required: true,
            type: 'password'
        },
        validators: {
            validation: ['max-length']
        }
    }
];

export interface LoginFormModel {
    email: string;
    password: string;
}