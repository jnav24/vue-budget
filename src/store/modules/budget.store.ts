import Vue from 'vue';
import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {ResponseInterface} from '@/interfaces/response.interface';
import {globalService, httpService, responseService} from '@/module';
import {UrlInterface} from '@/interfaces/url.interface';
import {BudgetStateInterface} from '@/interfaces/budget-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {BudgetTemplateInterface} from '@/interfaces/budget-template.interface';
import {BudgetListInterface} from '@/interfaces/budget-list.interface';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {BudgetTemplateRemoveInterface} from '@/interfaces/budget-template-remove.interface';
import {AxiosResponse} from 'axios';

const budgetList: BudgetListInterface[] = [];
const budgetTemplate: BudgetTemplateInterface = {} as BudgetTemplateInterface;

const currentState: BudgetStateInterface = {
    budgetList,
    budgetTemplate,
};

const getters: GetterTree<BudgetStateInterface, RootStateInterface> = {};

const actions: ActionTree<BudgetStateInterface, RootStateInterface> = {
    async addSingleBudget({ commit }, payload: string): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: '',
                params: {
                    name: payload,
                },
            };

            // @TODO: this will also return budget template with a budget_id...
            // @TODO: ...equal to the id below.
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
                const resData = responseService.getDataFromResponse(response);
                commit('addSingleBudget', resData);
                return responseService.getSuccessResponse('', { id: resData.id });
            }

            return responseService.getFailedResponse();
        } catch (error) {
            return responseService.getFailedResponse();
        }
    },
    async getAllBudgets({ commit }): Promise<ResponseInterface> {
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
    async deleteSingleBudget({ commit }, payload: number): Promise<ResponseInterface> {
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
    async getAllBudgetTemplates({ commit }): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'budget-templates',
            };

            const response: AxiosResponse = await httpService.authGet(data);

            if (responseService.isSuccessResponse(response.status)) {
                commit('addAllBudgetTemplates', responseService.getDataFromResponse(response));
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            return responseService.getFailedResponse();
        }
    },
    async appendBudgetTemplate({ commit }, payload: BudgetListAddInterface): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: '',
            };

            const response: any = await new Promise((resolve) => {
                resolve({
                    status: 200,
                    data: {
                        data: {
                            type: payload.type,
                            data: payload.data,
                        },
                    },
                });
            });

            if (responseService.isSuccessResponse(response.status)) {
                const resData = response.data.data;
                commit('addBudgetTemplate', resData);
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            return responseService.getFailedResponse();
        }
    },
    async removeTemplateElementAction({ commit }, payload: BudgetTemplateRemoveInterface) {
        try {
            const data: UrlInterface = {
                url: '',
                params: {},
            };

            const response: any = await new Promise((resolve) => {
                resolve({
                    status: 200,
                    data: {
                        data: {},
                    },
                });
            });

            if (responseService.isSuccessResponse(response.status)) {
                commit('removeTemplateElement', payload);
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
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
    removeSingleBudget(state, payload: number) {
        const index = state.budgetList.findIndex((num: any) => num.id === payload);
        Vue.delete(state.budgetList, index);
    },
    addAllBudgetTemplates(state, payload: BudgetTemplateInterface) {
        state.budgetTemplate = { ...globalService.sortObject(payload) };
    },
    addBudgetTemplate(state, payload: BudgetListAddInterface) {
        const tempData = { ...state.budgetTemplate };

        if (typeof tempData[payload.type] !== 'undefined') {
            tempData[payload.type] = [...tempData[payload.type], payload.data];
        } else {
            tempData[payload.type] = [payload.data];
        }

        state.budgetTemplate = { ...globalService.sortObject(tempData) };
    },
    resetBudgetState(state) {
        state.budgetList = [];
        state.budgetTemplate = {} as BudgetTemplateInterface;
    },
    removeTemplateElement(state, payload: BudgetTemplateRemoveInterface) {
        const tempData = [...(state.budgetTemplate as any)[payload.type]];
        const index = tempData.findIndex((obj: any) => obj.id === payload.id);
        tempData.splice(index, 1);

        if (tempData.length) {
            state.budgetTemplate = globalService.sortObject({ ...state.budgetTemplate, [payload.type]: tempData });
        } else {
            Vue.delete(state.budgetTemplate, payload.type);
        }
    },
};

const Budget: Module<BudgetStateInterface, RootStateInterface> = {
    state: currentState,
    getters,
    actions,
    mutations,
};

export default Budget;
