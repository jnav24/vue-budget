import {BudgetTemplateInterface} from '@/interfaces/budget-template.interface';

export interface BudgetTemplateStateInterface {
    canSave: boolean;
    templates: BudgetTemplateInterface;
}
