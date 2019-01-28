export interface BudgetListAddInterface {
    type: 'bank' | 'credit_card' | 'investment' | 'medical' | 'misc' | 'utility';
    data: any;
}
