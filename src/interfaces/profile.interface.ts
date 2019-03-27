import {UserVehicleInterface} from '@/interfaces/user-vehicle.interface';
import {UserInterface} from '@/interfaces/user.interface';

export interface ProfileInterface {
    profile: UserInterface;
    vehicles: UserVehicleInterface[];
}
