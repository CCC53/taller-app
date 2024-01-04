import { FormlyFieldConfig } from "@ngx-formly/core";

export const loginFormFields: FormlyFieldConfig[] = [
    {
        key: 'email',
        type: 'input',
        props: {
            label: 'Email',
            placeholder: 'Ingrese su email',
            required: true,
            maxLength: 50,
            type: 'email'
        },
        validators: {
            validation: ['email', 'valid-domain']
        }
    },
    {
        key: 'password',
        type: 'input',
        props: {
            label: 'Contraseña',
            placeholder: 'Ingrese su contraseña',
            required: true,
            maxLength: 10,
            type: 'password'
        },
        validators: {
            validation: ['max-length', 'blank-space']
        }
    }
];

export interface LoginFormModel {
    email: string;
    password: string;
}