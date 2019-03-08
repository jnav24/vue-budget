import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {AggregationStateInterface} from '@/interfaces/aggregation-state.interface';
import {ResponseInterface} from '@/interfaces/response.interface';
import {httpService, responseService} from '@/module';
import {UrlInterface} from '@/interfaces/url.interface';
import {AxiosResponse} from 'axios';

const budget: any[] = [];
const unpaid: any = {};

const currentState: AggregationStateInterface = {
    budget,
    unpaid,
};

const getters: GetterTree<AggregationStateInterface, RootStateInterface> = {};

const actions: ActionTree<AggregationStateInterface, RootStateInterface> = {
    async getYearlyAggregations({ commit }): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'budget-aggregate',
            };

            const response: AxiosResponse = await httpService.authGet(data);

            if (responseService.isSuccessResponse(response.status)) {
                commit('setBudgetAggregation', responseService.getDataFromResponse(response));
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
                commit('addUnpaidBillCount', responseService.getDataFromResponse(response));
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            return responseService.getFailedResponse();
        }
    },
};

const mutations: MutationTree<AggregationStateInterface> = {
    setBudgetAggregation(state, payload: any[]) {
        state.budget = payload;
    },
    addUnpaidBillCount(state, payload: any) {
        state.unpaid = payload;
    },
};

const Aggregation: Module<AggregationStateInterface, RootStateInterface> = {
    state: currentState,
    getters,
    actions,
    mutations,
};

export default Aggregation;
