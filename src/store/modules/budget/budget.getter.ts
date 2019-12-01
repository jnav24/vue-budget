import {GetterTree} from 'vuex';
import {BudgetStateInterface} from '@/store/modules/budget/budget-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';

const getters: GetterTree<BudgetStateInterface, RootStateInterface> = {};

export default getters;
