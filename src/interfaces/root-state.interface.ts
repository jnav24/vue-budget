import {UserStateInterface} from '@/interfaces/user-state.interface';
import {BudgetStateInterface} from '@/interfaces/budget-state.interface';
import {TypesStateInterface} from '@/interfaces/types-state.interface';
import {BudgetTemplateStateInterface} from '@/interfaces/budget-template-state.interface';
import {AggregationStateInterface} from '@/interfaces/aggregation-state.interface';

export interface RootStateInterface {
    Aggregation: AggregationStateInterface;
    Budget: BudgetStateInterface;
    BudgetTemplates: BudgetTemplateStateInterface;
    Types: TypesStateInterface;
    User: UserStateInterface;
}
