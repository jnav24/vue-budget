export interface BudgetListInterface {
    id: number;
    user_id: number;
    name: string;
    created_at: string;
    budget_cycle: string;
    expenses?: any;
    saved?: string;
}
