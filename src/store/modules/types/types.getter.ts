import {GetterTree} from 'vuex';
import {TypesStateInterface} from '@/store/modules/types/types-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {BillTypesInterface} from '@/interfaces/bill-types.interface';

const getters: GetterTree<TypesStateInterface, RootStateInterface> = {
    billTypes: (state) => state.bills,
    getTypeBySlug: (state) => (slug: string) => {
        return state.bills.find((obj: BillTypesInterface) => {
            return obj.slug === slug;
        });
    },
};

export default getters;
