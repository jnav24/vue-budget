import {GetterTree} from 'vuex';
import {UserStateInterface} from '@/store/modules/user/user-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';

const getters: GetterTree<UserStateInterface, RootStateInterface> = {};

export default getters;
