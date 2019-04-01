export interface VehicleInterface {
    id?: number | string;
    vehicle: number;
    mileage: string;
    vehicle_type_id: number;
    due_date: string;
    amount: string;
    paid_date?: string;
    confirmation?: string;
    created_at?: string;
    updated_at?: string;
}
