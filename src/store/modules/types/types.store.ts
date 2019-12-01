import {Module} from 'vuex';
import {TypesStateInterface} from '@/store/modules/types/types-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import state from '@/store/modules/types/types.state';
import getters from '@/store/modules/types/types.getter';
import actions from '@/store/modules/types/types.action';
import mutations from '@/store/modules/types/types.mutation';

const Types: Module<TypesStateInterface, RootStateInterface> = {
    state,
    getters,
    actions,
    mutations,
};

export default Types;
