import {UserInterface} from '@/interfaces/user.interface';
import {UserVehicleInterface} from '@/interfaces/user-vehicle.interface';

export interface UserStateInterface {
    login: any;
    user: UserInterface;
    vehicles: UserVehicleInterface[];
}
