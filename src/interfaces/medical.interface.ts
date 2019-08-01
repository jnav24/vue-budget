export interface MedicalInterface {
    id?: number | string;
    name: string;
    amount: string;
    medical_type_id: number;
    budget_id?: number;
    budget_template_id?: number;
    created_at?: string;
    updated_at?: string;
    due_date: string;
    paid_date?: string;
    confirmation?: string;
    not_track_amount?: number;
}
