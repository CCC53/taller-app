import { AbstractControl } from '@angular/forms';

const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
export const textOnlyRegex = new RegExp(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/);
const textNumbersOnlyRegex = new RegExp(/^[a-zA-Z0-9 ]*$/);
const numbersOnlyRegex = new RegExp(/^[a-zA-Z0-9 ]*$/);
const maxLengthRegex = new RegExp(/^.{5,}$/);
export const blankSpaceRegex = new RegExp(/^[^\s].*[^\s]$/);

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

export function blankSpaceValidator(control: AbstractControl) {
    return blankSpaceRegex.test(control.value) ? null : { 'blank-space': true }
}

export function denyValuesInSearch(control: AbstractControl) {
    const forbbidenValues = ["Administrador", "administrador", "Mecánico", "mecánico", "Sedan", "Torton", "Trailer", "SUV", "Pickup",
        "torton", "trailer", "suv", "pickup", "Suv"];
    return forbbidenValues.some(val => val === control.value) ? null : { 'forbbiden-values': true }
}

export function validEmailDomain(control: AbstractControl) {
    const validDomains = ["hotmail", "gmail", "yahoo", "outlook", "live"];
    return validDomains.indexOf(control.value) < 0 ? { 'valid-domain': true } : null;
}