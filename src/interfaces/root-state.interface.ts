import {UserStateInterface} from '@/interfaces/user-state.interface';
import {BillsStateInterface} from '@/interfaces/bills-state.interface';

export interface RootStateInterface {
    Bills: BillsStateInterface;
    Budget: any;
    User: UserStateInterface;
}
