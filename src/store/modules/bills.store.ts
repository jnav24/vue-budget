import {ActionContext, Module} from 'vuex';
import {AxiosResponse} from 'axios';
import {BillTypesInterface} from '@/interfaces/bill-types.interface';
import {ResponseInterface} from '@/interfaces/response.interface';
import {responseService} from '@/module';
import {UrlInterface} from '@/interfaces/url.interface';

const types: BillTypesInterface[] = [];

const Bills: Module<any, any> = {
    state: {
        types,
    },
    getters: {},
    actions: {
        async getAllBillTypes({ commit }: ActionContext<any, any>): Promise<ResponseInterface> {
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
    },
    mutations: {
        addAllBillTypes(state: any, payload: BillTypesInterface[]) {
            state.types = payload;
        },
    },
};

export default Bills;
