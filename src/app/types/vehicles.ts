
export interface Vehicle {
    id: string;
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

export enum validVehicles {
    SEDAN = "sedan",
	TORTON = "torton",
	TRAILER = "trailer",
	SUV = "suv",
	PICKUP = "pickup"
}

export interface FindVehicleResponse {
    vehicle: Vehicle;
}

export interface NewVehicleResponse extends FindVehicleResponse {}

export interface UpdateVehicleResponse extends FindVehicleResponse {}

