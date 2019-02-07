import {UserStateInterface} from '@/interfaces/user-state.interface';
import {BudgetStateInterface} from '@/interfaces/budget-state.interface';
import {TypesStateInterface} from '@/interfaces/types-state.interface';
import {BudgetTemplateStateInterface} from '@/interfaces/budget-template-state.interface';

export interface RootStateInterface {
    Budget: BudgetStateInterface;
    BudgetTemplates: BudgetTemplateStateInterface;
    Types: TypesStateInterface;
    User: UserStateInterface;
}
