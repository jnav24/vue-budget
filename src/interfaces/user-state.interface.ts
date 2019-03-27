import {UserInterface} from '@/interfaces/user.interface';
import {UserVehicleInterface} from '@/interfaces/user-vehicle.interface';

export interface UserStateInterface {
    user: UserInterface;
    vehicles: UserVehicleInterface[];
}
