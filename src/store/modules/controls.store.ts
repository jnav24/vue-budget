import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {ControlsStateInterface} from '@/interfaces/controls-state.interface';

const localState: ControlsStateInterface = {
    canRegister: false,
};

const getters: GetterTree<ControlsStateInterface, RootStateInterface> = {};

const actions: ActionTree<ControlsStateInterface, RootStateInterface> = {};

const mutations: MutationTree<ControlsStateInterface> = {};

const Controls: Module<ControlsStateInterface, RootStateInterface> = {
    state: localState,
    getters,
    actions,
    mutations,
};

export default Controls;
