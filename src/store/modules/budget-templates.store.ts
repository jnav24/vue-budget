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

const templates: BudgetTemplateInterface = {} as BudgetTemplateInterface;

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
    addBudgetTemplate(state, payload: BudgetListAddInterface) {
        const tempData = { ...state.templates };

        if (typeof (tempData.expenses as any)[payload.type] !== 'undefined') {
            (tempData.expenses as any)[payload.type] = [...(tempData.expenses as any)[payload.type], payload.data];
        } else {
            (tempData.expenses as any)[payload.type] = [payload.data];
        }

        state.templates = {
            id: state.templates.id,
            expenses: {
                ...globalService.sortObject(tempData.expenses),
            },
        };
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
    updateCanSave(state, payload: boolean) {
        state.canSave = payload;
    },
};

const BudgetTemplates: Module<BudgetTemplateStateInterface, RootStateInterface> = {
    state: currentState,
    getters,
    actions,
    mutations,
};

export default BudgetTemplates;
