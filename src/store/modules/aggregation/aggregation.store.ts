import {Module} from 'vuex';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import state from '@/store/modules/aggregation/aggregation.state';
import getters from '@/store/modules/aggregation/aggregation.getter';
import actions from '@/store/modules/aggregation/aggregation.action';
import mutations from '@/store/modules/aggregation/aggregation.mutation';
import {AggregationStateInterface} from '@/store/modules/aggregation/aggregation-state.interface';

const Aggregation: Module<AggregationStateInterface, RootStateInterface> = {
    state,
    getters,
    actions,
    mutations,
};

export default Aggregation;
