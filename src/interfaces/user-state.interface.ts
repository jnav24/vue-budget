import {UserInterface} from '@/interfaces/user.interface';
import {UserVehicleInterface} from '@/interfaces/user-vehicle.interface';
import {UserLoginStateInterface} from '@/interfaces/user-login-state.interface';

export interface UserStateInterface {
    login: UserLoginStateInterface;
    user: UserInterface;
    vehicles: UserVehicleInterface[];
}
