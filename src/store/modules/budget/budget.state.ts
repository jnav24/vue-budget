import {BudgetListInterface} from '@/interfaces/budget-list.interface';
import {BudgetStateInterface} from '@/store/modules/budget/budget-state.interface';

const budgetList: BudgetListInterface[] = [];

const state: BudgetStateInterface = {
    budgetList,
};

export default state;
