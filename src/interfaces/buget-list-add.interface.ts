export interface BudgetListAddInterface {
    type: 'banks' | 'credit_cards' | 'investments' |
        'medical' | 'miscellaneous' | 'utilities' | 'jobs' | 'vehicles' | 'blank';
    data: any;
}
