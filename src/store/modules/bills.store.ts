import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {AxiosResponse} from 'axios';
import {BillTypesInterface} from '@/interfaces/bill-types.interface';
import {ResponseInterface} from '@/interfaces/response.interface';
import {responseService} from '@/module';
import {UrlInterface} from '@/interfaces/url.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {BillsStateInterface} from '@/interfaces/bills-state.interface';

const types: BillTypesInterface[] = [];

const currentState: BillsStateInterface = {
    types,
};

const getters: GetterTree<BillsStateInterface, RootStateInterface> = {};

const actions: ActionTree<BillsStateInterface, RootStateInterface> = {
    async getAllBillTypes({ commit }): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: '',
            };

            const response: any = new Promise((resolve) => {
                resolve({
                    status: 200,
                    data: {
                        data: {
                            bill_types: [
                                { id: 1, name: 'Credit Card', slug: 'credit_card'},
                            ],
                        },
                    },
                });
            });

            if (responseService.isSuccessResponse(response.status)) {
                const resData = responseService.getDataFromResponse(response);
                commit('addAllBillTypes', resData);
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            return responseService.getFailedResponse();
        }
    },
};

const mutations: MutationTree<BillsStateInterface> = {
    addAllBillTypes(state, payload: BillTypesInterface[]) {
        state.types = payload;
    },
};

const Bills: Module<BillsStateInterface, RootStateInterface> = {
    state: currentState,
    getters,
    actions,
    mutations,
};

export default Bills;
