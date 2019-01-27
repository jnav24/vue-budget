import Vue from 'vue';
import {ActionContext, Module} from 'vuex';
import {ResponseInterface} from '@/interfaces/response.interface';
import {responseService} from '@/module';
import {UrlInterface} from '@/interfaces/url.interface';

const budgetList: any[] = [];

const Budget: Module<any, any> = {
    state: {
        budgetList,
    },
    getters: {},
    actions: {
        async addSingleBudget({ commit }: ActionContext<any, any>, payload: string): Promise<ResponseInterface> {
            try {
                const data: UrlInterface = {
                    url: '',
                    params: {
                        name: payload,
                    },
                };

                const response: any = await new Promise((resolve) => {
                    resolve({
                        status: 200,
                        data: {
                            data: {
                                budget: {
                                    id: 4,
                                    user_id: 1,
                                    name: payload,
                                    created_at: '2019-04-01 00:00:00',
                                },
                            },
                        },
                    });
                });

                if (responseService.isSuccessResponse(response.status)) {
                    commit('addSingleBudget', responseService.getDataFromResponse(response));
                    return responseService.getSuccessResponse();
                }

                return responseService.getFailedResponse();
            } catch (error) {
                return responseService.getFailedResponse();
            }
        },
        async getAllBudgets({ commit }: ActionContext<any, any>): Promise<ResponseInterface> {
            try {
                const data: UrlInterface = {
                    url: '',
                };

                const response: any = await new Promise((resolve) => {
                    resolve({
                        status: 200,
                        data: {
                            data: {
                                budgets: [
                                    { id: 3, user_id: 1, name: 'March Budget', created_at: '2019-03-01 00:00:00' },
                                    { id: 2, user_id: 1, name: 'February Budget', created_at: '2019-02-01 00:00:00' },
                                    { id: 1, user_id: 1, name: 'January Budget', created_at: '2019-01-01 00:00:00' },
                                ],
                            },
                        },
                    });
                });

                if (responseService.isSuccessResponse(response.status)) {
                    commit('addBudget', responseService.getDataFromResponse(response));
                    return responseService.getSuccessResponse();
                }

                return responseService.getFailedResponse();
            } catch (error) {
                return responseService.getFailedResponse();
            }
        },
        async deleteSingleBudget({ commit }: ActionContext<any, any>, payload: number): Promise<ResponseInterface> {
            try {
                const data: UrlInterface = {
                    url: '',
                    params: {
                        id: payload,
                    },
                };

                const response: any = await new Promise((resolve) => {
                    resolve({
                        status: 200,
                    });
                });

                if (responseService.isSuccessResponse(response.status)) {
                    commit('removeSingleBudget', payload);
                    return responseService.getSuccessResponse();
                }

                return responseService.getFailedResponse();
            } catch (error) {
                return responseService.getFailedResponse();
            }
        },
    },
    mutations: {
        addBudget(state: any, payload: any) {
            state.budgetList = payload;
        },
        addSingleBudget(state: any, payload: any) {
            state.budgetList = [payload, ...state.budgetList];
        },
        removeSingleBudget(state: any, payload: any) {
            const index = state.budgetList.findIndex((num: any) => num.id === payload);
            Vue.delete(state.budgetList, index);
        },
    },
};

export default Budget;
