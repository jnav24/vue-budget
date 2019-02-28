export interface CreditCardsInterface {
    id?: number | string;
    name: string;
    limit: string;
    last_4: string;
    exp_month: string;
    exp_year: string;
    apr: number;
    due_date: number;
    credit_card_type_id: number;
    budget_id?: number;
    budget_template_id?: number;
    created_at?: string;
    updated_at?: string;
    paid_date?: string;
    confirmation?: string;
    amount: string;
}
