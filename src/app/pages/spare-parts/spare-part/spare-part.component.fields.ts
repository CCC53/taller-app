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
            placeholder: 'Ingrese el precio de la refacción',
            required: true,
            type: 'number'
        }
    },
    {
        key: 'supplier',
        type: 'input',
        props: {
            label: 'Proveedor',
            placeholder: 'Ingrese el proveedor de la refacción',
            required: true,
        },
        validators: {
            validation: ['text-only']
        }
    },
    {
        key: 'purchaseDate',
        type: 'datepicker',
        props: {
            label: 'Fecha de adquisicion',
            placeholder: 'Fecha de adquisicion de la refacción',
            required: true,
            type: 'date'
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