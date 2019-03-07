import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {AggregationStateInterface} from '@/interfaces/aggregation-state.interface';

const budget: any[] = [];

const currentState: AggregationStateInterface = {
    budget,
};

const getters: GetterTree<AggregationStateInterface, RootStateInterface> = {};

const actions: ActionTree<AggregationStateInterface, RootStateInterface> = {};

const mutations: MutationTree<AggregationStateInterface> = {};

const Aggregation: Module<AggregationStateInterface, RootStateInterface> = {
    state: currentState,
    getters,
    actions,
    mutations,
};

export default Aggregation;
