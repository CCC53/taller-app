import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { validSpareParts } from "src/app/types/spare-parts";

export interface SparePartFieldsModel {
    name: string;
    disponible: number;
    price: number;
    supplier: string;
    purchaseDate: Date;
    type: validSpareParts;
}

export const sparePartFormOptions: FormlyFormOptions = {
    formState: {
        isNew: true
    }
};

export const sparePartViewFields: FormlyFieldConfig[] = [
    {
        key: 'name',
        type: 'input',
        props: {
            label: 'Nombre',
            maxLength: 30,
            placeholder: 'Ingrese el nombre de la refacción',
            required: true,
        },
        validators: {
            validation: ['text-only']
        }
    },
    {
        key: 'disponible',
        type: 'input',
        props: {
            label: 'Cantidad disponible',
            min: 1,
            maxLength: 15,
            placeholder: 'Ingrese la cantidad disponible de la refacción',
            required: true,
            type: 'number'
        }
    },
    {
        key: 'price',
        type: 'input',
        props: {
            label: 'Precio unitario',
            min: 1,
            max: 9999,
            placeholder: 'Ingrese el precio de la refacción',
            required: true,
            type: 'number'
        }
    },
    {
        key: 'supplier',
        type: 'select',
        props: {
            label: 'Proveedor',
            placeholder: 'Seleccione un proveedor',
            required: true,
            options: [
                { label: 'Seleccione un proveedor', value: null },
                { label: 'ATE', value: 'ATE' },
                { label: 'BERU', value: 'BERU' },
                { label: 'BOSCH', value: 'BOSCH' },
                { label: 'CONTITECH', value: 'CONTITECH' },
                { label: 'LUK', value: 'LUK' },
                { label: 'MORESA', value: 'MORESA' },
                { label: 'NAKATA', value: 'NAKATA' },
                { label: 'PENSTOSIN', value: 'PENSTOSIN' },
                { label: 'VALEO', value: 'VALEO' }
            ]
        }
    },
    {
        key: 'purchaseDate',
        type: 'datepicker',
        templateOptions: {
            label: 'Fecha de adquisicion',
            placeholder: 'Fecha de adquisicion de la refacción',
            required: true,
            type: 'date'
        },
        expressionProperties: {
            'templateOptions.datepickerOptions.min': 'formState.isNew ? new Date() : new Date(model.purchaseDate)'
        }
    },
    {
        key: 'type',
        type: 'select',
        props: {
            label: 'Tipo',
            placeholder: 'Seleccione un tipo',
            required: true,
            options: [
                { label: 'Seleccione un tipo', value: null },
                { label: 'Mantenimiento', value: validSpareParts.MAINTENANCE },
                { label: 'Repuesto', value: validSpareParts.REPLACEMENT }
            ]
        }
    }
];