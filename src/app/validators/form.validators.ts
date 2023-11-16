import { AbstractControl, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AsyncValidatorsService } from '../services/async-validators.service';

const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const textOnlyRegex = new RegExp(/^[a-zA-Z ]*$/);
const textNumbersOnlyRegex = new RegExp(/^[a-zA-Z0-9 ]*$/);
const numbersOnlyRegex = new RegExp(/^[a-zA-Z0-9 ]*$/);
const maxLengthRegex = new RegExp(/^.{5,}$/);

export function emailValidator(control: AbstractControl) {
    return emailRegex.test(control.value) ? null : { 'email': true };
}

export function textOnlyValidator(control: AbstractControl) {
    return textOnlyRegex.test(control.value) ? null : { 'text-only': true }
}

export function textNumbersOnlyValidator(control: AbstractControl) {
    return textNumbersOnlyRegex.test(control.value) ? null : { 'text-number': true }
}

export function numbersOnlyValidator(control: AbstractControl) {
    return numbersOnlyRegex.test(control.value) ? null : { 'text-number': true }
}

export function maxLengthPassword(control: AbstractControl) {
    return maxLengthRegex.test(control.value) ? null : { 'max-length': true }
}

export function checkEmailConfig(asyncValidatorsService: AsyncValidatorsService) {
    return {
        validationMessages: [
            { name: 'existent-email', message: 'Ya existe un empleado registrado con este email' }
        ],
        validators: [
            {
                name: 'existent-email',
                validation: (control: FormControl) => {
                    return asyncValidatorsService.checkEmail({ email: control.value }).pipe(
                        map(existent => !existent ? null : { 'existent-email': true })
                    )
                }
            }
        ]
    }
}