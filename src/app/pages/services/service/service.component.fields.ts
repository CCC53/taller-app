import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";

export interface ServiceFieldsModel {
    issue: string;
    startDate: Date;
    endDate: Date;
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
            maxLength: 50,
            placeholder: 'Ingrese el motivo del servicio',
            required: true,
        },
        validators: {
            validation: ['text-only', 'blank-space']
        }
    },
    {
        key: 'startDate',
        type: 'datepicker',
        templateOptions: {
            label: 'Fecha de inicio',
            placeholder: 'Fecha de inicio del servicio',
            required: true,
            type: 'date'
        },
        expressionProperties: {
            'templateOptions.datepickerOptions.min': 'formState.isNew ? new Date() : new Date(model.startDate)'
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
        },
        expressionProperties: {
            'templateOptions.datepickerOptions.min':
                'formState.isNew ? new Date(new Date(model.startDate).setDate(new Date(model.startDate).getDate() + 1)): new Date(model.endDate)'
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
            label: 'Agregar mecánico',
            placeholder: 'Seleccione un mecánico',
            required: true,
            options: [
                { label: 'Seleccione un mecánico', value: null }
            ]
        }
    }
]

export const addSparePart: FormlyFieldConfig[] = [
    {
        key: 'sparePartID',
        type: 'select',
        props: {
            label: 'Agregar refacción',
            placeholder: 'Seleccione una refacción',
            required: true,
            options: [
                { label: 'Seleccione un refacción', value: null }
            ]
        }
    },
    {
        key: 'quantityToUse',
        type: 'input',
        props: {
            label: 'Cantidad a utilizar',
            maxLength: 15,
            min: 1,
            placeholder: 'Cantidad a utilizar',
            required: true,
            type: 'number'
        },
    }
]