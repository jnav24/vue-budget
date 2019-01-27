import {BudgetListInterface} from '@/interfaces/budget-list.interface';
import {BudgetTemplateInterface} from '@/interfaces/budget-template.interface';

export interface BudgetStateInterface {
    budgetList: BudgetListInterface[];
    budgetTemplate: BudgetTemplateInterface;
}
