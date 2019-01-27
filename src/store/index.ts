import Vue from 'vue';
import Vuex from 'vuex';
import Budget from './modules/budget.store';
import User from './modules/user.store';
import { cookiesService } from '@/module';
import Bills from '@/store/modules/bills.store';
import {RootStateInterface} from '@/interfaces/root-state.interface';

Vue.use(Vuex);

const userCookieName: any = process.env.VUE_APP_TOKEN;

export default new Vuex.Store<RootStateInterface>({
    actions: {},
    mutations: {
        logUserOut(state: any) {
            const excludeDefault: string[] = ['BusinessTypes'];

            for (const st of Object.keys(state)) {
                if (excludeDefault.indexOf(st) < 0) {
                    state[st] = {};
                }
            }

            cookiesService.deleteCookie(userCookieName);
        },
    },
    modules: {
        Bills,
        Budget,
        User,
    },
});
