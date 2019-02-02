import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {TypesStateInterface} from '@/interfaces/types-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {BillTypesInterface} from '@/interfaces/bill-types.interface';
import {UrlInterface} from '@/interfaces/url.interface';
import {AxiosResponse} from 'axios';
import {ResponseInterface} from '@/interfaces/response.interface';
import {httpService, responseService} from '@/module';
import {BankTypesInterface} from '@/interfaces/bank-types.interface';
import {CreditCardTypesInterface} from '@/interfaces/credit-card-types.interface';
import {InvestmentTypesInterface} from '@/interfaces/investment-types.interface';
import {UtilityTypesInterface} from '@/interfaces/utility-types.interface';

const bank: BankTypesInterface[] = [];
const bill: BillTypesInterface[] = [];
const creditCard: CreditCardTypesInterface[] = [];
const investment: InvestmentTypesInterface[] = [];
const utility: UtilityTypesInterface[] = [];

const currentState: TypesStateInterface = {
    bank,
    bill,
    creditCard,
    investment,
    utility,
};

const getters: GetterTree<TypesStateInterface, RootStateInterface> = {};

const actions: ActionTree<TypesStateInterface, RootStateInterface> = {
    async getAllBillTypes({ commit }): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'bill/types',
            };

            const response: AxiosResponse = await httpService.authGet(data);

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

const mutations: MutationTree<TypesStateInterface> = {
    addAllBillTypes(state, payload: BillTypesInterface[]) {
        state.bill = payload;
    },
};

const Types: Module<TypesStateInterface, RootStateInterface> = {
    state: currentState,
    getters,
    actions,
    mutations,
};

export default Types;
