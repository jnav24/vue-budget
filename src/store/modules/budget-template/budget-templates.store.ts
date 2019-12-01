import {Module} from 'vuex';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {BudgetTemplateStateInterface} from '@/store/modules/budget-template/budget-template-state.interface';
import state from '@/store/modules/budget-template/budget-template.state';
import getters from '@/store/modules/budget-template/budget-template.getter';
import actions from '@/store/modules/budget-template/budget-template.action';
import mutations from '@/store/modules/budget-template/budget-template.mutation';

const BudgetTemplates: Module<BudgetTemplateStateInterface, RootStateInterface> = {
    state,
    getters,
    actions,
    mutations,
};

export default BudgetTemplates;
