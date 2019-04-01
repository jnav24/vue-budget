import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {BudgetTemplateStateInterface} from '@/interfaces/budget-template-state.interface';
import {BudgetTemplateInterface} from '@/interfaces/budget-template.interface';
import {BudgetTemplateRemoveInterface} from '@/interfaces/budget-template-remove.interface';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {globalService, httpService, responseService} from '@/module';
import {UrlInterface} from '@/interfaces/url.interface';
import {AxiosResponse} from 'axios';
import {ResponseInterface} from '@/interfaces/response.interface';
import Vue from 'vue';

const templates: BudgetTemplateInterface = {
    expenses: {
        banks: [],
        credit_cards: [],
        investments: [],
        jobs: [],
        medical: [],
        miscellaneous: [],
        utilities: [],
        vehicles: [],
    },
};

const currentState: BudgetTemplateStateInterface = {
    canSave: false,
    templates,
};

const getters: GetterTree<BudgetTemplateStateInterface, RootStateInterface> = {};

const actions: ActionTree<BudgetTemplateStateInterface, RootStateInterface> = {
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
    async removeTemplateElementAction({ commit }, payload: BudgetTemplateRemoveInterface) {
        try {
            const data: UrlInterface = {
                url: 'budget-templates',
                params: payload,
            };

            const response: AxiosResponse = await httpService.authDelete(data);

            if (responseService.isSuccessResponse(response.status)) {
                commit('removeTemplateElement', payload);
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            return responseService.getFailedResponse();
        }
    },
    async saveBudgetTemplate({ commit }, payload: BudgetTemplateInterface) {
        try {
            const data: UrlInterface = {
                url: 'budget-templates',
                params: payload,
            };

            const response: AxiosResponse = await httpService.authPost(data);

            if (responseService.isSuccessResponse(response.status)) {
                commit('addAllBudgetTemplates', responseService.getDataFromResponse(response));
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            return responseService.getFailedResponse();
        }
    },
};

const mutations: MutationTree<BudgetTemplateStateInterface> = {
    addAllBudgetTemplates(state, payload: BudgetTemplateInterface) {
        state.templates = { id: payload.id, expenses: { ...globalService.sortObject(payload.expenses) } };
    },
    /**
     * @deprecated
     * @param state
     * @param {BudgetListAddInterface} payload
     */
    addBudgetTemplate(state, payload: BudgetListAddInterface) {
        const tempData = { ...state.templates };

        (tempData.expenses as any)[payload.type] = [...(tempData.expenses as any)[payload.type], payload.data];

        state.templates = {
            id: state.templates.id,
            expenses: {
                ...globalService.sortObject(tempData.expenses),
            },
        };
    },
    /**
     * @deprecated
     * @param state
     * @param {BudgetListAddInterface} payload
     */
    updateBudgetTemplate(state, payload: BudgetListAddInterface) {
        const tempData = { ...state.templates };
        const index = (tempData.expenses as any)[payload.type]
            .findIndex((obj: any) => {
                console.log(obj);
                return obj.id === payload.data.id;
            });

        Vue.set((tempData.expenses as any)[payload.type], index, payload.data);
    },
    resetBudgetTemplatesState(state) {
        state.canSave = false;
        state.templates = {} as BudgetTemplateInterface;
    },
    removeTemplateElement(state, payload: BudgetTemplateRemoveInterface) {
        const tempData = [...(state.templates.expenses as any)[payload.type]];
        const index = tempData.findIndex((obj: any) => obj.id === payload.id);
        tempData.splice(index, 1);

        state.templates = {
            id: state.templates.id,
            expenses: globalService.sortObject({
                ...state.templates.expenses,
                [payload.type]: tempData,
            }),
        };
    },
};

const BudgetTemplates: Module<BudgetTemplateStateInterface, RootStateInterface> = {
    state: currentState,
    getters,
    actions,
    mutations,
};

export default BudgetTemplates;
