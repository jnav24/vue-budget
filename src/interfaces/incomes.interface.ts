export interface IncomesInterface {
    id?: number | string;
    name: string;
    amount: string;
    income_type_id: number;
    budget_id?: number;
    budget_template_id?: number;
    created_at?: string;
    updated_at?: string;
    initial_pay_date: string;
}
