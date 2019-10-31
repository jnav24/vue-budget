import {ActionTree} from 'vuex';
import {BudgetTemplateStateInterface} from '@/store/modules/budget-template/budget-template-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {ResponseInterface} from '@/interfaces/response.interface';
import {UrlInterface} from '@/interfaces/url.interface';
import {AxiosResponse} from 'axios';
import {httpService, responseService} from '@/module';
import {BudgetTemplateRemoveInterface} from '@/interfaces/budget-template-remove.interface';
import {BudgetTemplateInterface} from '@/interfaces/budget-template.interface';

const actions: ActionTree<BudgetTemplateStateInterface, RootStateInterface> = {
    async getAllBudgetTemplates({ commit }): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'budget-templates',
            };

            const response: AxiosResponse = await httpService.authGet(data);

            if (responseService.isSuccessResponse(response.status)) {
                commit('ADD_ALL_BUDGET_TEMPLATES', responseService.getDataFromResponse(response));
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
                commit('REMOVE_TEMPLATE_ELEMENT', payload);
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
                commit('ADD_ALL_BUDGET_TEMPLATES', responseService.getDataFromResponse(response));
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            if (responseService.isTokenExpired(error.response.data.message)) {
                commit('TOKEN_EXPIRED', true);
            }

            return responseService.getFailedResponse();
        }
    },
};

export default actions;
