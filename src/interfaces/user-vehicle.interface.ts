export interface UserVehicleInterface {
    id: string | number;
    make: string;
    model: string;
    year: string;
    color: string;
    license?: string;
    active: number;
}
