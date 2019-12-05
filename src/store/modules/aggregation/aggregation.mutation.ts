import Vue from 'vue';
import {MutationTree} from 'vuex';
import {AggregationStateInterface} from '@/store/modules/aggregation/aggregation-state.interface';
import {AggregationBudgetInterface} from '@/interfaces/aggregation-budget.interface';
import {AggregationUnpaidInterface} from '@/interfaces/aggregation-unpaid.interface';

const mutations: MutationTree<AggregationStateInterface> = {
    APPEND_EMPTY_BUDGET_AGGREGATION(state, payload: string) {
        const empty = ['0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00'];
        state.budget = {
            ...state.budget,
            [payload]: {
                earned: empty,
                saved: empty,
                spent: empty,
            },
        };
    },

    SET_BUDGET_AGGREGATION(state, payload: AggregationBudgetInterface) {
        state.budget = payload;
    },

    UPDATE_BUDGET_AGGREGATION(state, payload: AggregationBudgetInterface) {
        const year = Object.keys(payload).shift();

        if (typeof year === 'string') {
            Vue.set(state.budget, year, payload[year]);
        }
    },

    ADD_UNPAID_BILL_COUNT(state, payload: AggregationUnpaidInterface) {
        state.unpaid = payload;
    },
};

export default mutations;
