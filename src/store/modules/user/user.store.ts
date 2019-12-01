import {Module} from 'vuex';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {UserStateInterface} from '@/store/modules/user/user-state.interface';
import state from '@/store/modules/user/user.state';
import getters from '@/store/modules/user/user.getter';
import actions from '@/store/modules/user/user.action';
import mutations from '@/store/modules/user/user.mutation';

const User: Module<UserStateInterface, RootStateInterface> = {
    state,
    getters,
    actions,
    mutations,
};

export default User;
