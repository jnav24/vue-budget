import {GetterTree} from 'vuex';
import {UserStateInterface} from '@/store/modules/user/user-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';

const getters: GetterTree<UserStateInterface, RootStateInterface> = {
    userVehicles: (state) => {
        return state.vehicles.map((vehicle) => {
            return {
                value: vehicle.id,
                label: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
            };
        });
    },
};

export default getters;
