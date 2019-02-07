export interface BudgetListAddInterface {
    type: 'banks' | 'credit_cards' | 'investments' | 'medical' | 'miscellaneous' | 'utilities' | 'jobs' | 'blank';
    data: any;
}
