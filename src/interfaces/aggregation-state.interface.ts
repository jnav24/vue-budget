import {AggregationUnpaidInterface} from '@/interfaces/aggregation-unpaid.interface';
import {AggregationBudgetInterface} from '@/interfaces/aggregation-budget.interface';

export interface AggregationStateInterface {
    budget: AggregationBudgetInterface;
    unpaid: AggregationUnpaidInterface;
}
