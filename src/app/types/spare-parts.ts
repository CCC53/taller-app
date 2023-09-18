
export interface SparePart {
    id: string;
    name: string;
    disponible: number;
    price: number;
    supplier: string;
    purchaseDate: Date;
    type: validSpareParts;
}

export enum validSpareParts {
    MAINTENANCE = "maintenance",
	REPLACEMENT = "replacement"
}

export interface FindSparePartsResponse {
    spareParts: SparePart[];
    totalCount: number;
}

export interface FindSparePartResponse {
    sparePart: SparePart;
}

export interface NewSparePartResponse extends FindSparePartResponse {}

export interface UpdateSparePartResponse extends FindSparePartResponse {}