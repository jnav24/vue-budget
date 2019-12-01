import {MutationTree} from 'vuex';
import {TypesStateInterface} from '@/store/modules/types/types-state.interface';
import {BankTypesInterface} from '@/interfaces/bank-types.interface';
import {BillTypesInterface} from '@/interfaces/bill-types.interface';
import {CreditCardTypesInterface} from '@/interfaces/credit-card-types.interface';
import {InvestmentTypesInterface} from '@/interfaces/investment-types.interface';
import {JobTypesInterface} from '@/interfaces/job-types.interface';
import {MedicalTypesInterface} from '@/interfaces/medical-types.interface';
import {UtilityTypesInterface} from '@/interfaces/utility-types.interface';
import {VehicleTypesInterface} from '@/interfaces/vehicle-types.interface';

const mutations: MutationTree<TypesStateInterface> = {
    ADD_BANK_TYPES(state, payload: BankTypesInterface[]) {
        state.banks = payload;
    },

    ADD_BILL_TYPES(state, payload: BillTypesInterface[]) {
        state.bills = payload;
    },

    ADD_CREDIT_CARD_TYPES(state, payload: CreditCardTypesInterface[]) {
        state.creditCards = payload;
    },

    ADD_INVESTMENT_TYPES(state, payload: InvestmentTypesInterface[]) {
        state.investments = payload;
    },

    ADD_JOB_TYPES(state, payload: JobTypesInterface[]) {
        state.jobs = payload;
    },

    ADD_MEDICAL_TYPES(state, payload: MedicalTypesInterface[]) {
        state.medical = payload;
    },

    ADD_UTILITY_TYPES(state, payload: UtilityTypesInterface[]) {
        state.utilities = payload;
    },

    ADD_VEHICLE_TYPES(state, payload: VehicleTypesInterface[]) {
        state.vehicles = payload;
    },
};

export default mutations;
