import {AggregationBudgetInterface} from '@/interfaces/aggregation-budget.interface';
import {AggregationUnpaidInterface} from '@/interfaces/aggregation-unpaid.interface';
import {AggregationStateInterface} from '@/store/modules/aggregation/aggregation-state.interface';

const budget: AggregationBudgetInterface = {} as AggregationBudgetInterface;
const unpaid: AggregationUnpaidInterface = {} as AggregationUnpaidInterface;

const state: AggregationStateInterface = {
    budget,
    unpaid,
};

export default state;
