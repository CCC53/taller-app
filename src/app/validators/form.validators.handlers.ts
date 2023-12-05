import { AbstractControl } from '@angular/forms';

const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const textOnlyRegex = new RegExp(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g);
const textNumbersOnlyRegex = new RegExp(/^[a-zA-Z0-9 ]*$/);
const numbersOnlyRegex = new RegExp(/^[a-zA-Z0-9 ]*$/);
const maxLengthRegex = new RegExp(/^.{5,}$/);
const blankSpaceRegex = new RegExp("[^ ]+");

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