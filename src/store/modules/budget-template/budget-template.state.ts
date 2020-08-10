import {BudgetTemplateInterface} from '@/interfaces/budget-template.interface';
import {BudgetTemplateStateInterface} from '@/store/modules/budget-template/budget-template-state.interface';

const templates: BudgetTemplateInterface = {
    expenses: {
        banks: [],
        childcare: [],
        credit_cards: [],
        education: [],
        entertainment: [],
        food: [],
        gift: [],
        housing: [],
        investments: [],
        incomes: [],
        loan: [],
        medical: [],
        miscellaneous: [],
        personal: [],
        shopping: [],
        subscription: [],
        tax: [],
        travel: [],
        utilities: [],
        vehicles: [],
    },
};

const state: BudgetTemplateStateInterface = {
    canSave: false,
    templates,
};

export default state;
