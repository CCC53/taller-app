import { emailValidator, numbersOnlyValidator, textNumbersOnlyValidator,
            textOnlyValidator, maxLengthPassword, blankSpaceValidator, validEmailDomain } from './form.validators.handlers';

export const appValidators = {
    validators: [
        { name: 'email', validation: emailValidator },
        { name: 'text-only', validation: textOnlyValidator },
        { name: 'text-number', validation: textNumbersOnlyValidator },
        { name: 'number', validation: numbersOnlyValidator },
        { name: 'max-length', validation: maxLengthPassword },
        { name: 'blank-space', validation: blankSpaceValidator },
        { name: 'valid-domain', validation: validEmailDomain }
    ],
    validationMessages: [
        { name: 'email', message: 'No es un correo válido' },
        { name: 'text-only', message: 'Solo se permiten letras' },
        { name: 'text-number', message: 'Solo se permiten letras y números' },
        { name: 'number', message: 'Solo se permiten números' },
        { name: 'max-length', message: 'La contraseña debe ser de mínimo 5 caracteres' },
        { name: 'required', message: 'Este campo es obligatorio' },
        { name: 'blank-space', message: 'No se permiten espacios al inicio y al final' },
        { name: 'valid-domain', message: 'No es un dominio valido' }
    ],
};