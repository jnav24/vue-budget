import {BudgetTemplateInterface} from '@/interfaces/budget-template.interface';
import {BudgetTemplateStateInterface} from '@/store/modules/budget-template/budget-template-state.interface';

const templates: BudgetTemplateInterface = {
    expenses: {
        banks: [],
        credit_cards: [],
        investments: [],
        jobs: [],
        medical: [],
        miscellaneous: [],
        utilities: [],
        vehicles: [],
    },
};

const state: BudgetTemplateStateInterface = {
    canSave: false,
    templates,
};

export default state;
