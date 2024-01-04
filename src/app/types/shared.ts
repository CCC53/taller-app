
export interface Route {
    route: string;
    icon: string;
    label: string;
}

export interface TableColumn {
    key: string;
    label: string;
    pipe?: 'date' | 'currency' | 'employeeRole' | 'sparePartType' | 'vehicleType'
}

export interface DynamicTableOptions {
    columns: TableColumn[];
    table: 'employees' | 'vehicles' | 'services' | 'spare-parts';
    allowSearch: boolean;
    allowedDelete: boolean;
    allowedEdit: boolean;
    allowPagination: boolean;
    showIcon: boolean;
    searchLabel?: string;
    minLength?: number;
}

export interface DynamicTableData {
    data: any[];
    totalCount: number;
}

export interface PaginatorData {
    pageIndex: number;
    pageSize: number;
}

export interface DeleteItemResponse {
    deleted: boolean;
}