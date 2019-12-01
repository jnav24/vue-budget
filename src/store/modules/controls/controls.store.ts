import {Module} from 'vuex';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {ControlsStateInterface} from '@/store/modules/controls/controls-state.interface';
import state from '@/store/modules/controls/controls.state';
import getters from '@/store/modules/controls/controls.getter';
import actions from '@/store/modules/controls/controls.action';
import mutations from '@/store/modules/controls/controls.mutation';

const Controls: Module<ControlsStateInterface, RootStateInterface> = {
    state,
    getters,
    actions,
    mutations,
};

export default Controls;
