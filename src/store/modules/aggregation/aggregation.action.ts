import {ActionTree} from 'vuex';
import {AggregationStateInterface} from '@/store/modules/aggregation/aggregation-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {ResponseInterface} from '@/interfaces/response.interface';
import {UrlInterface} from '@/interfaces/url.interface';
import {AxiosResponse} from 'axios';
import {httpService, responseService} from '@/module';

const actions: ActionTree<AggregationStateInterface, RootStateInterface> = {
    async getYearlyAggregations({ commit }): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'budget-aggregate',
            };

            const response: AxiosResponse = await httpService.authGet(data);

            if (responseService.isSuccessResponse(response.status)) {
                commit('SET_BUDGET_AGGREGATION', responseService.getDataFromResponse(response));
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            return responseService.getFailedResponse();
        }
    },

    async getUnpaidBillTotals({ commit }): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'unpaid-aggregate',
            };

            const response: AxiosResponse = await httpService.authGet(data);

            if (responseService.isSuccessResponse(response.status)) {
                commit('ADD_UNPAID_BILL_COUNT', responseService.getDataFromResponse(response));
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            return responseService.getFailedResponse();
        }
    },

    async getSelectedYearAggregate({ commit }, payload: { year: string }): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'current-budget-aggregate/' + payload.year,
            };

            const response: AxiosResponse = await httpService.authGet(data);

            if (responseService.isSuccessResponse(response.status)) {
                commit('UPDATE_BUDGET_AGGREGATION', responseService.getDataFromResponse(response));
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            return responseService.getFailedResponse();
        }
    },
};

export default actions;
