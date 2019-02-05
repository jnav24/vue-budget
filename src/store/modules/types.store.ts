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
import {MedicalTypesInterface} from '@/interfaces/medical-types.interface';

const banks: BankTypesInterface[] = [];
const bills: BillTypesInterface[] = [];
const creditCards: CreditCardTypesInterface[] = [];
const investments: InvestmentTypesInterface[] = [];
const medical: MedicalTypesInterface[] = [];
const utilities: UtilityTypesInterface[] = [];

const currentState: TypesStateInterface = {
    banks,
    bills,
    creditCards,
    investments,
    medical,
    utilities,
};

const getters: GetterTree<TypesStateInterface, RootStateInterface> = {};

const actions: ActionTree<TypesStateInterface, RootStateInterface> = {
    async getAllBankTypes({ commit }): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'types/bank',
            };

            const response: AxiosResponse = await httpService.authGet(data);

            if (responseService.isSuccessResponse(response.status)) {
                commit('addBankTypes', responseService.getDataFromResponse(response));
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            return responseService.getFailedResponse();
        }
    },
    async getAllBillTypes({ commit }): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'types/bill',
            };

            const response: AxiosResponse = await httpService.authGet(data);

            if (responseService.isSuccessResponse(response.status)) {
                const resData = responseService.getDataFromResponse(response);
                commit('addBillTypes', resData);
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            return responseService.getFailedResponse();
        }
    },
    async getAllCreditCardTypes({ commit }): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'types/credit-card',
            };

            const response: AxiosResponse = await httpService.authGet(data);

            if (responseService.isSuccessResponse(response.status)) {
                commit('addCreditCardTypes', responseService.getDataFromResponse(response));
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            return responseService.getFailedResponse();
        }
    },
    async getAllInvestmentTypes({ commit }): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'types/investment',
            };

            const response: AxiosResponse = await httpService.authGet(data);

            if (responseService.isSuccessResponse(response.status)) {
                commit('addInvestmentTypes', responseService.getDataFromResponse(response));
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            return responseService.getFailedResponse();
        }
    },
    async getAllMedicalTypes({ commit }): Promise<ResponseInterface> {
        try {
            const data: UrlInterface = {
                url: 'types/medical',
            };

            const response: AxiosResponse = await httpService.authGet(data);

            if (responseService.isSuccessResponse(response.status)) {
                commit('addMedicalTypes', responseService.getDataFromResponse(response));
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            return responseService.getFailedResponse();
        }
    },
    async getAllUtilityTypes({ commit }) {
        try {
            const data: UrlInterface = {
                url: 'types/utility',
            };

            const response: AxiosResponse = await httpService.authGet(data);

            if (responseService.isSuccessResponse(response.status)) {
                commit('addUtilityTypes', responseService.getDataFromResponse(response));
                return responseService.getSuccessResponse();
            }

            return responseService.getFailedResponse();
        } catch (error) {
            return responseService.getFailedResponse();
        }
    },
};

const mutations: MutationTree<TypesStateInterface> = {
    addBankTypes(state, payload: BankTypesInterface[]) {
        state.banks = payload;
    },
    addBillTypes(state, payload: BillTypesInterface[]) {
        state.bills = payload;
    },
    addCreditCardTypes(state, payload: CreditCardTypesInterface[]) {
        state.creditCards = payload;
    },
    addInvestmentTypes(state, payload: InvestmentTypesInterface[]) {
        state.investments = payload;
    },
    addMedicalTypes(state, payload: MedicalTypesInterface[]) {
        state.medical = payload;
    },
    addUtilityTypes(state, payload: UtilityTypesInterface[]) {
        state.utilities = payload;
    },
};

const Types: Module<TypesStateInterface, RootStateInterface> = {
    state: currentState,
    getters,
    actions,
    mutations,
};

export default Types;
