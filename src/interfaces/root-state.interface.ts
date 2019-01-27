import {UserStateInterface} from '@/interfaces/user-state.interface';
import {BillsStateInterface} from '@/interfaces/bills-state.interface';
import {BudgetStateInterface} from '@/interfaces/budget-state.interface';

export interface RootStateInterface {
    Bills: BillsStateInterface;
    Budget: BudgetStateInterface;
    User: UserStateInterface;
}
