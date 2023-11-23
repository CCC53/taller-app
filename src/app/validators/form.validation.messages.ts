import { emailValidator, numbersOnlyValidator, textNumbersOnlyValidator,
            textOnlyValidator, maxLengthPassword } from './form.validators.handlers';

export const appValidators = {
    validators: [
        { name: 'email', validation: emailValidator },
        { name: 'text-only', validation: textOnlyValidator },
        { name: 'text-number', validation: textNumbersOnlyValidator },
        { name: 'number', validation: numbersOnlyValidator },
        { name: 'max-length', validation: maxLengthPassword }
    ],
    validationMessages: [
        { name: 'email', message: 'No es un correo válido' },
        { name: 'text-only', message: 'Solo se permiten letras' },
        { name: 'text-number', message: 'Solo se permiten letras y números' },
        { name: 'number', message: 'Solo se permiten números' },
        { name: 'max-length', message: 'La contraseña debe ser de mínimo 5 caracteres' },
        { name: 'required', message: 'Este campo es obligatorio' }
    ],
};