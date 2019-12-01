import Vue from 'vue';
import {MutationTree} from 'vuex';
import {UserStateInterface} from '@/store/modules/user/user-state.interface';
import {UserInterface} from '@/interfaces/user.interface';
import {UserVehicleInterface} from '@/interfaces/user-vehicle.interface';

const mutations: MutationTree<UserStateInterface> = {
    ADD_CSRF_TOKEN(state, payload: string) {
        state.login = {
            ...state.login,
            csrf: payload,
        };
    },

    ADD_USER(state, usr: UserInterface) {
        state.user = usr;
    },

    ADD_USER_VEHICLES(state, payload: UserVehicleInterface[]) {
        state.vehicles = payload;
    },

    RESET_USER_STATE(state) {
        state.user = {} as UserInterface;
    },

    TOKEN_EXPIRED(state, payload: boolean) {
        Vue.set(state.login, 'timeout', payload);
    },
};

export default mutations;
