export interface BudgetListAddInterface {
    type: 'bank' | 'creditCards' | 'investments' | 'medical' | 'misc' | 'utility';
    data: any;
}
