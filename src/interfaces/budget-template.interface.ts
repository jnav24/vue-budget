export interface BudgetTemplateInterface {
    id?: number;
    expenses: {
        banks?: any;
        credit_cards?: any;
        investments?: any;
        jobs?: any;
        medical?: any;
        miscellaneous?: any;
        utilities?: any;
    };
}
