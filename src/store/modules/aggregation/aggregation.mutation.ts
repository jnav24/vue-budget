import Vue from 'vue';
import {MutationTree} from 'vuex';
import {AggregationStateInterface} from '@/store/modules/aggregation/aggregation-state.interface';
import {AggregationBudgetInterface} from '@/interfaces/aggregation-budget.interface';
import {AggregationUnpaidInterface} from '@/interfaces/aggregation-unpaid.interface';

const mutations: MutationTree<AggregationStateInterface> = {
    setBudgetAggregation(state, payload: AggregationBudgetInterface) {
        state.budget = payload;
    },

    updateBudgetAggregation(state, payload: AggregationBudgetInterface) {
        const year = Object.keys(payload).shift();

        if (typeof year === 'string') {
            Vue.set(state.budget, year, payload[year]);
        }
    },

    addUnpaidBillCount(state, payload: AggregationUnpaidInterface) {
        state.unpaid = payload;
    },
};

export default mutations;
