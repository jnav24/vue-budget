import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {AggregationStateInterface} from '@/interfaces/aggregation-state.interface';
import {ResponseInterface} from '@/interfaces/response.interface';
import {httpService, responseService} from '@/module';
import {UrlInterface} from '@/interfaces/url.interface';
import {AxiosResponse} from 'axios';
import {AggregationUnpaidInterface} from '@/interfaces/aggregation-unpaid.interface';
import {AggregationBudgetInterface} from '@/interfaces/aggregation-budget.interface';

const budget: AggregationBudgetInterface = {} as AggregationBudgetInterface;
const unpaid: AggregationUnpaidInterface = {} as AggregationUnpaidInterface;

const currentState: AggregationStateInterface = {
    budget,
    unpaid,
};

const getters: GetterTree<AggregationStateInterface, RootStateInterface> = {
    totalUnpaid: (state) => {
        let total = 0;

        if (typeof state.unpaid.totals !== 'undefined') {
            for (const key of Object.keys(state.unpaid.totals)) {
                total += Number((state.unpaid.totals as any)[key]);
            }

        }
        return total;
    },
};

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
    async getCurrentYearAggregate({ commit }): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'current-budget-aggregate',
            };

            const response: AxiosResponse = await httpService.authGet(data);
            console.log(response);

            if (responseService.isSuccessResponse(response.status)) {
                // commit('setBudgetAggregation', responseService.getDataFromResponse(response));
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            return responseService.getFailedResponse();
        }
    },
};

const mutations: MutationTree<AggregationStateInterface> = {
    setBudgetAggregation(state, payload: AggregationBudgetInterface) {
        state.budget = payload;
    },
    addUnpaidBillCount(state, payload: AggregationUnpaidInterface) {
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
