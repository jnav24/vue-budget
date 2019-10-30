import Vue from 'vue';
import {MutationTree} from 'vuex';
import {UserStateInterface} from '@/store/modules/user/user-state.interface';
import {UserInterface} from '@/interfaces/user.interface';
import {UserVehicleInterface} from '@/interfaces/user-vehicle.interface';

const mutations: MutationTree<UserStateInterface> = {
    addUser(state, usr: UserInterface) {
        state.user = usr;
    },

    addUserVehicles(state, payload: UserVehicleInterface[]) {
        state.vehicles = payload;
    },

    resetUserState(state) {
        state.user = {} as UserInterface;
    },

    tokenExpired(state, payload: boolean) {
        Vue.set(state.login, 'timeout', payload);
    },
};

export default mutations;
