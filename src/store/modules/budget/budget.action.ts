import {ActionTree} from 'vuex';
import {BudgetStateInterface} from '@/store/modules/budget/budget-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {ResponseInterface} from '@/interfaces/response.interface';
import {UrlInterface} from '@/interfaces/url.interface';
import {AxiosResponse} from 'axios';
import {httpService, responseService} from '@/module';

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
                commit('ADD_SINGLE_BUDGET', resData);
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
                commit('UPDATE_SINGLE_BUDGET', resData);
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
                commit('ADD_BUDGET', responseService.getDataFromResponse(response));
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
                commit('UPDATE_SINGLE_BUDGET', resData);
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
                commit('REMOVE_SINGLE_BUDGET', payload);
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

export default actions;
