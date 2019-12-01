import {UserLoginStateInterface} from '@/interfaces/user-login-state.interface';
import {UserInterface} from '@/interfaces/user.interface';
import {UserVehicleInterface} from '@/interfaces/user-vehicle.interface';
import {UserStateInterface} from '@/store/modules/user/user-state.interface';

const login: UserLoginStateInterface = {
    csrf: '',
    timeout: false,
    throttle: {
        attempts: 0,
        allowed: 3,
    },
};
const user: UserInterface = {} as UserInterface;
const vehicles: UserVehicleInterface[] = [];

const state: UserStateInterface = {
    login,
    user,
    vehicles,
};

export default state;
