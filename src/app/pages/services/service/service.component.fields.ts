import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";

export interface ServiceFieldsModel {
    issue: string;
    startDate: Date | null;
    endDate: Date | null;
    vehicleID: string;
}

export const serviceFormOptions: FormlyFormOptions = {
    formState: {
        isNew: true
    }
};

export const serviceViewFields: FormlyFieldConfig[] = [
    {
        key: 'issue',
        type: 'input',
        props: {
            label: 'Motivo',
            placeholder: 'Ingrese el motivo del servicio',
            required: true,
        },
        validators: {
            validation: ['text-only']
        }
    },
    {
        key: 'startDate',
        type: 'datepicker',
        props: {
            label: 'Fecha de inicio',
            placeholder: 'Fecha de inicio del servicio',
            required: true,
            type: 'date'
        }
    },
    {
        key: 'endDate',
        type: 'datepicker',
        templateOptions: {
            label: 'Fecha de termino',
            placeholder: 'Fecha de termino del servicio',
            required: true,
            type: 'date'
        }
    },
    {
        key: 'vehicleID',
        type: 'select',
        props: {
            label: 'Vehiculo',
            placeholder: 'Seleccione un vehiculo',
            required: true,
            options: [
                { label: 'Seleccione un vehiculo', value: null }
            ]
        }
    }
]

export const addEmployee: FormlyFieldConfig[] = [
    {
        key: 'employeeID',
        type: 'select',
        props: {
            label: 'Agregar mecanico',
            placeholder: 'Seleccione un mecanico',
            required: true,
            options: [
                { label: 'Seleccione un mecanico', value: null }
            ]
        }
    }
]

export const addSparePart: FormlyFieldConfig[] = [
    {
        key: 'sparePartID',
        type: 'select',
        props: {
            label: 'Agregar refaccion',
            placeholder: 'Seleccione una refaccion',
            required: true,
            options: [
                { label: 'Seleccione un refaccion', value: null }
            ]
        }
    },
    {
        key: 'quantityToUse',
        type: 'input',
        props: {
            label: 'Cantidad a utilizar',
            placeholder: 'Cantidad a utilizar',
            required: true,
            type: 'number'
        }
    }
]