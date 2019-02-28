export interface BanksInterface {
    id: number | string;
    name: string;
    amount: string;
    bank_template_id: number;
    bank_type_id: number;
    budget_id?: number;
    budget_template_id?: number;
    created_at?: string;
    updated_at?: string;
}
