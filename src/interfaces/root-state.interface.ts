import {UserStateInterface} from '@/store/modules/user/user-state.interface';
import {BudgetStateInterface} from '@/store/modules/budget/budget-state.interface';
import {TypesStateInterface} from '@/store/modules/types/types-state.interface';
import {BudgetTemplateStateInterface} from '@/store/modules/budget-template/budget-template-state.interface';
import {AggregationStateInterface} from '@/store/modules/aggregation/aggregation-state.interface';
import {ControlsStateInterface} from '@/store/modules/controls/controls-state.interface';

export interface RootStateInterface {
    Aggregation: AggregationStateInterface;
    Budget: BudgetStateInterface;
    BudgetTemplates: BudgetTemplateStateInterface;
    Controls: ControlsStateInterface;
    Types: TypesStateInterface;
    User: UserStateInterface;
}
