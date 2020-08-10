import {MutationTree} from 'vuex';
import {ControlsStateInterface} from '@/store/modules/controls/controls-state.interface';

const mutations: MutationTree<ControlsStateInterface> = {
    SET_DIALOG_STATUS(state, payload: boolean) {
        state.isDialogOpened = payload;
    },
};

export default mutations;
