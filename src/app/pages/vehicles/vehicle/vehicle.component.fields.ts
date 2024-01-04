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
            maxLength: 30,
            placeholder: 'Ingrese la marca del vehiculo',
            required: true
        },
        validators: {
            validation: ['text-only', 'blank-space']
        }
    },
    {
        key: 'model',
        type: 'input',
        props: {
            label: 'Modelo',
            maxLength: 30,
            placeholder: 'Ingrese el modelo del vehiculo',
            required: true
        },
        validators: {
            validation: ['text-number', 'blank-space']
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
            min: 1970,
            max: new Date().getFullYear(),
            placeholder: 'Ingrese el año del vehiculo',
            required: true,
            type: 'number'
        },
        validators: {
            validation: ['number']
        }
    },
    {
        key: 'chassis',
        type: 'input',
        props: {
            label: 'Numero de chasis',
            maxLength: 30,
            placeholder: 'Ingrese el numero de chasis',
            required: true
        },
        validators: {
            validation: ['text-number', 'blank-space']
        }
    },
    {
        key: 'motor',
        type: 'input',
        props: {
            label: 'Motor',
            maxLength: 30,
            placeholder: 'Ingrese el motor del vehiculo',
            required: true
        },
        validators: {
            validation: ['text-number', 'blank-space']
        }
    },
    {
        key: 'plate',
        type: 'input',
        props: {
            label: 'Placa',
            maxLength: 30,
            placeholder: 'Ingrese la placa del vehiculo',
            required: true
        },
        validators: {
            validation: ['text-number', 'blank-space']
        }
    },
    {
        key: 'owner',
        type: 'input',
        props: {
            label: 'Propietario',
            maxLength: 50,
            placeholder: 'Ingrese el nombre del propietario del vehiculo',
            required: true
        },
        validators: {
            validation: ['text-only', 'blank-space']
        }
    },
    {
        key: 'emailOwner',
        type: 'input',
        props: {
            label: 'Email del propietario',
            maxLength: 50,
            placeholder: 'Ingrese el email del propietario del vehiculo',
            required: true,
            type: 'email'
        },
        validators: {
            validation: ['email', 'valid-domain']
        }
    }
];