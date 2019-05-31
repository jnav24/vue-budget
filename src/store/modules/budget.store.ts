import Vue from 'vue';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {ResponseInterface} from '@/interfaces/response.interface';
import {httpService, responseService} from '@/module';
import {UrlInterface} from '@/interfaces/url.interface';
import {BudgetStateInterface} from '@/interfaces/budget-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {BudgetListInterface} from '@/interfaces/budget-list.interface';
import {AxiosResponse} from 'axios';

const budgetList: BudgetListInterface[] = [];

const currentState: BudgetStateInterface = {
    budgetList,
};

const getters: GetterTree<BudgetStateInterface, RootStateInterface> = {};

const actions: ActionTree<BudgetStateInterface, RootStateInterface> = {
    async saveBudget({ commit }, payload: { name: string; cycle: string; expenses: any }): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'budgets',
                params: {
                    name: payload.name,
                    cycle: payload.cycle,
                    expenses: payload.expenses,
                },
            };

            const response: AxiosResponse = await httpService.authPost(data);

            if (responseService.isSuccessResponse(response.status)) {
                const resData = responseService.getDataFromResponse(response);
                commit('addSingleBudget', resData);
                return responseService.getSuccessResponse('', { id: resData.id });
            }

            return responseService.getFailedResponse();
        } catch (error) {
            return responseService.getFailedResponse();
        }
    },
    async updateBudget(
        { commit },
        payload: { id: number; name: string; budget_cycle: string; expenses: any },
    ): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'budgets',
                params: {
                    id: payload.id,
                    name: payload.name,
                    cycle: payload.budget_cycle,
                    expenses: payload.expenses,
                },
            };

            const response: AxiosResponse = await httpService.authPost(data);

            if (responseService.isSuccessResponse(response.status)) {
                const resData = responseService.getDataFromResponse(response);
                commit('updateSingleBudget', resData);
                return responseService.getSuccessResponse('', { id: resData.id });
            }

            return responseService.getFailedResponse();
        } catch (error) {
            if (responseService.isTokenExpired(error.response.data.message)) {
                commit('tokenExpired', true);
            }

            return responseService.getFailedResponse();
        }
    },
    async getAllBudgets({ commit }): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'budgets',
            };

            const response: AxiosResponse = await httpService.authGet(data);

            if (responseService.isSuccessResponse(response.status)) {
                commit('addBudget', responseService.getDataFromResponse(response));
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            return responseService.getFailedResponse();
        }
    },
    async getSingleBudget({ commit }, payload: number): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'budgets/' + payload,
            };

            const response: AxiosResponse = await httpService.authGet(data);

            if (responseService.isSuccessResponse(response.status)) {
                const resData = responseService.getDataFromResponse(response);
                commit('updateSingleBudget', resData);
                return responseService.getSuccessResponse('', resData);
            }

            return responseService.getFailedResponse();
        } catch (error) {
            return responseService.getFailedResponse();
        }
    },
    async deleteSingleBudget({ commit }, payload: number): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'budgets/' + payload,
            };

            const response: AxiosResponse = await httpService.authDelete(data);

            if (responseService.isSuccessResponse(response.status)) {
                commit('removeSingleBudget', payload);
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            if (responseService.isTokenExpired(error.response.data.message)) {
                commit('tokenExpired', true);
            }

            return responseService.getFailedResponse();
        }
    },
};

const mutations: MutationTree<BudgetStateInterface> = {
    addBudget(state, payload: BudgetListInterface[]) {
        state.budgetList = payload;
    },
    addSingleBudget(state, payload: BudgetListInterface) {
        state.budgetList = [payload, ...state.budgetList];
    },
    updateSingleBudget(state, payload: any) {
        const index = state.budgetList.findIndex((obj: any) => obj.id === Number(payload.id));

        if (index > -1) {
            Vue.set(state.budgetList, index, payload);
        }
    },
    removeSingleBudget(state, payload: number) {
        const index = state.budgetList.findIndex((num: any) => num.id === payload);
        Vue.delete(state.budgetList, index);
    },
    resetBudgetState(state) {
        state.budgetList = [];
    },
};

const Budget: Module<BudgetStateInterface, RootStateInterface> = {
    state: currentState,
    getters,
    actions,
    mutations,
};

export default Budget;
