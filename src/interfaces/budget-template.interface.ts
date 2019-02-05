export interface BudgetTemplateInterface {
    id?: number;
    expenses: {
        bank?: any;
        credit_card?: any;
        investment?: any;
        job?: any;
        medical?: any;
        miscellaneous?: any;
        utility?: any;
    };
}
