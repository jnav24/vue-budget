import Vue from 'vue';
import {MutationTree} from 'vuex';
import {BudgetStateInterface} from '@/store/modules/budget/budget-state.interface';
import {BudgetListInterface} from '@/interfaces/budget-list.interface';

const mutations: MutationTree<BudgetStateInterface> = {
    ADD_BUDGET(state, payload: BudgetListInterface[]) {
        state.budgetList = payload;
    },

    ADD_SINGLE_BUDGET(state, payload: BudgetListInterface) {
        state.budgetList = [payload, ...state.budgetList];
    },

    UPDATE_SINGLE_BUDGET(state, payload: BudgetListInterface) {
        const index = state.budgetList.findIndex((obj: any) => obj.id === payload.id);

        if (index > -1) {
            Vue.set(state.budgetList, index, payload);
        }
    },

    REMOVE_SINGLE_BUDGET(state, payload: number) {
        const index = state.budgetList.findIndex((num: any) => num.id === payload);
        Vue.delete(state.budgetList, index);
    },

    RESET_BUDGET_STATE(state) {
        state.budgetList = [];
    },
};

export default mutations;
