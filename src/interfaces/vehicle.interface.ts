export interface VehicleInterface {
    id?: number | string;
    budget_id?: number;
    budget_template_id?: number;
    mileage: string;
    amount: string;
    due_date: string;
    user_vehicle_id: number;
    vehicle_type_id: number;
    paid_date?: string;
    confirmation?: string;
    created_at?: string;
    updated_at?: string;
}
