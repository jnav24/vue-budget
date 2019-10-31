import {BankTypesInterface} from '@/interfaces/bank-types.interface';
import {BillTypesInterface} from '@/interfaces/bill-types.interface';
import {CreditCardTypesInterface} from '@/interfaces/credit-card-types.interface';
import {InvestmentTypesInterface} from '@/interfaces/investment-types.interface';
import {JobTypesInterface} from '@/interfaces/job-types.interface';
import {MedicalTypesInterface} from '@/interfaces/medical-types.interface';
import {UtilityTypesInterface} from '@/interfaces/utility-types.interface';
import {VehicleTypesInterface} from '@/interfaces/vehicle-types.interface';
import {TypesStateInterface} from '@/store/modules/types/types-state.interface';

const banks: BankTypesInterface[] = [];
const bills: BillTypesInterface[] = [];
const creditCards: CreditCardTypesInterface[] = [];
const investments: InvestmentTypesInterface[] = [];
const jobs: JobTypesInterface[] = [];
const medical: MedicalTypesInterface[] = [];
const utilities: UtilityTypesInterface[] = [];
const vehicles: VehicleTypesInterface[] = [];

const state: TypesStateInterface = {
    banks,
    bills,
    creditCards,
    investments,
    jobs,
    medical,
    utilities,
    vehicles,
};

export default state;
