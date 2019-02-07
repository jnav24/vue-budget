import Vue from 'vue';
import Vuex, {ActionTree, MutationTree} from 'vuex';
import Budget from './modules/budget.store';
import BudgetTemplates from './modules/budget-templates.store';
import User from './modules/user.store';
import { cookiesService } from '@/module';
import Types from '@/store/modules/types.store';
import {RootStateInterface} from '@/interfaces/root-state.interface';

Vue.use(Vuex);

const userCookieName: any = process.env.VUE_APP_TOKEN;

const actions: ActionTree<any, RootStateInterface> = {
    logUserOut({ commit }): Promise<{ success: boolean }> {
        return new Promise((resolve) => {
            commit('removeSession');
            commit('resetUserState');
            commit('resetBudgetState');
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
        Budget,
        BudgetTemplates,
        Types,
        User,
    },
});
