export interface InvestmentsInterface {
    id?: number | string;
    name: string;
    amount: string;
    investment_type_id: number;
    budget_id?: number;
    budget_template_id?: number;
    created_at?: string;
    updated_at?: string;
}
