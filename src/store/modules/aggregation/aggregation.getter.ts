import {GetterTree} from 'vuex';
import {AggregationStateInterface} from '@/store/modules/aggregation/aggregation-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';

const getters: GetterTree<AggregationStateInterface, RootStateInterface> = {
    totalUnpaid: (state) => {
        let total = 0;

        if (typeof state.unpaid.totals !== 'undefined') {
            for (const key of Object.keys(state.unpaid.totals)) {
                total += Number((state.unpaid.totals as any)[key]);
            }

        }
        return total;
    },
};

export default getters;
