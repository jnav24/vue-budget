export interface BudgetListAddInterface {
    type: 'bank' | 'credit_card' | 'investment' | 'medical' | 'miscellaneous' | 'utility' | 'job';
    data: any;
}
