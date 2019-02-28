export interface UtilitiesInterface {
    id: number | string;
    name: string;
    amount: string;
    budget_id?: number;
    budget_template_id?: number;
    created_at: string;
    updated_at: string;
    due_date: string;
    paid_date?: string;
    confirmation?: string;
    utility_type_id: number;
}
