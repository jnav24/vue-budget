import Vue from 'vue';
import Vuex, {ActionTree, MutationTree} from 'vuex';
import Budget from './modules/budget/budget.store';
import BudgetTemplates from './modules/budget-templates.store';
import User from './modules/user/user.store';
import { cookiesService } from '@/module';
import Types from '@/store/modules/types.store';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import Aggregation from '@/store/modules/aggregation/aggregation.store';
import Controls from '@/store/modules/controls.store';

Vue.use(Vuex);

const userCookieName: any = process.env.VUE_APP_TOKEN;

const actions: ActionTree<any, RootStateInterface> = {
    logUserOut({ commit }): Promise<{ success: boolean }> {
        return new Promise((resolve) => {
            commit('removeSession');
            commit('resetUserState');
            commit('RESET_BUDGET_STATE');
            commit('resetBudgetTemplatesState');
            resolve({ success: true });
        });
    },
};

const mutations: MutationTree<RootStateInterface> = {
    removeSession(state: any) {
        cookiesService.deleteCookie(userCookieName);
    },
};

export default new Vuex.Store<RootStateInterface>({
    actions,
    mutations,
    modules: {
        Aggregation,
        Budget,
        BudgetTemplates,
        Controls,
        Types,
        User,
    },
});
