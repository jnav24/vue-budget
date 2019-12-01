import {Module} from 'vuex';
import {BudgetStateInterface} from '@/store/modules/budget/budget-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import state from '@/store/modules/budget/budget.state';
import getters from '@/store/modules/budget/budget.getter';
import actions from '@/store/modules/budget/budget.action';
import mutations from '@/store/modules/budget/budget.mutation';

const Budget: Module<BudgetStateInterface, RootStateInterface> = {
    state,
    getters,
    actions,
    mutations,
};

export default Budget;
