import {MutationTree} from 'vuex';
import {TypesStateInterface} from '@/store/modules/types/types-state.interface';
import {BillTypesInterface} from '@/interfaces/bill-types.interface';

const mutations: MutationTree<TypesStateInterface> = {
    ADD_BILL_TYPES(state, payload: BillTypesInterface[]) {
        state.bills = payload;
    },

    ADD_TYPE(state, payload: { type: string; typeList: any[]}) {
        (state as any)[payload.type] = payload.typeList;
    },
};

export default mutations;
