import {UserStateInterface} from '@/interfaces/user-state.interface';
import {BudgetStateInterface} from '@/interfaces/budget-state.interface';
import {TypesStateInterface} from '@/interfaces/types-state.interface';

export interface RootStateInterface {
    Budget: BudgetStateInterface;
    Types: TypesStateInterface;
    User: UserStateInterface;
}
