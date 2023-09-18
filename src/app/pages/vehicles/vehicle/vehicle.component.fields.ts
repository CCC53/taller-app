import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import { validVehicles } from "src/app/types/vehicles";

export interface VehicleFieldsModel {
    brand: string;
    model: string;
    type: validVehicles;
    year: number
    chassis: string;
    motor: string;
    plate: string;
    owner: string;
    emailOwner: string;
}

export const vehicleFormOptions: FormlyFormOptions = {
    formState: {
        isNew: true
    }
};

export const vehicleViewFields: FormlyFieldConfig[] = [
    {
        key: 'brand',
        type: 'input',
        props: {
            label: 'Marca',
            placeholder: 'Ingrese la marca del vehiculo',
            required: true
        },
        validators: {
            validation: ['text-only']
        }
    },
    {
        key: 'model',
        type: 'input',
        props: {
            label: 'Modelo',
            placeholder: 'Ingrese el modelo del vehiculo',
            required: true
        },
        validators: {
            validation: ['text-number']
        }
    },
    {
        key: 'type',
        type: 'select',
        props: {
            label: 'Tipo',
            placeholder: 'Seleccione el tipo del vehiculo',
            required: true,
            options: [
                { label: 'Sedan', value: validVehicles.SEDAN },
                { label: 'Torton', value: validVehicles.TORTON },
                { label: 'Trailer', value: validVehicles.TRAILER },
                { label: 'SUV', value: validVehicles.SUV },
                { label: 'Pickup', value: validVehicles.PICKUP }
            ]
        }
    },
    {
        key: 'year',
        type: 'input',
        props: {
            label: 'Año',
            placeholder: 'Ingrese el año del vehiculo',
            required: true,
            type: 'number'
        },
        validators: {
            validation: ['number']
        }
    },
    {
        key: 'motor',
        type: 'input',
        props: {
            label: 'Motor',
            placeholder: 'Ingrese el motor del vehiculo',
            required: true
        },
        validators: {
            validation: ['text-number']
        }
    },
    {
        key: 'plate',
        type: 'input',
        props: {
            label: 'Placa',
            placeholder: 'Ingrese la placa del vehiculo',
            required: true
        },
        validators: {
            validation: ['text-number']
        }
    },
    {
        key: 'owner',
        type: 'input',
        props: {
            label: 'Propietario',
            placeholder: 'Ingrese el nombre del propietario del vehiculo',
            required: true
        },
        validators: {
            validation: ['text-only']
        }
    },
    {
        key: 'emailOwner',
        type: 'input',
        props: {
            label: 'Email del propietario',
            placeholder: 'Ingrese el email del propietario del vehiculo',
            required: true,
            type: 'email'
        },
        validators: {
            validation: ['email']
        }
    }
];