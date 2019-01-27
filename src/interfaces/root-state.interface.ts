import {UserStateInterface} from '@/interfaces/user-state.interface';

export interface RootStateInterface {
    Bills: any;
    Budget: any;
    User: UserStateInterface;
}
