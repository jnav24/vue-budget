import {BankTypesInterface} from '@/interfaces/bank-types.interface';
import {BillTypesInterface} from '@/interfaces/bill-types.interface';
import {CreditCardTypesInterface} from '@/interfaces/credit-card-types.interface';
import {InvestmentTypesInterface} from '@/interfaces/investment-types.interface';
import {JobTypesInterface} from '@/interfaces/job-types.interface';
import {MedicalTypesInterface} from '@/interfaces/medical-types.interface';
import {UtilityTypesInterface} from '@/interfaces/utility-types.interface';
import {VehicleTypesInterface} from '@/interfaces/vehicle-types.interface';
import {TypesStateInterface} from '@/store/modules/types/types-state.interface';
import {CommonExpenseTypeInterface} from '@/interfaces/common-expense-type.interface';

const banks: BankTypesInterface[] = [];
const bills: BillTypesInterface[] = [];
const childcare: CommonExpenseTypeInterface[] = [];
const creditCards: CreditCardTypesInterface[] = [];
const education: CommonExpenseTypeInterface[] = [];
const entertainment: CommonExpenseTypeInterface[] = [];
const food: CommonExpenseTypeInterface[] = [];
const gift: CommonExpenseTypeInterface[] = [];
const housing: CommonExpenseTypeInterface[] = [];
const incomes: JobTypesInterface[] = [];
const investments: InvestmentTypesInterface[] = [];
const loan: CommonExpenseTypeInterface[] = [];
const medical: MedicalTypesInterface[] = [];
const personal: CommonExpenseTypeInterface[] = [];
const shopping: CommonExpenseTypeInterface[] = [];
const subscription: CommonExpenseTypeInterface[] = [];
const tax: CommonExpenseTypeInterface[] = [];
const travel: CommonExpenseTypeInterface[] = [];
const utilities: UtilityTypesInterface[] = [];
const vehicles: VehicleTypesInterface[] = [];

const state: TypesStateInterface = {
    banks,
    bills,
    childcare,
    creditCards,
    education,
    entertainment,
    food,
    gift,
    housing,
    investments,
    incomes,
    loan,
    medical,
    personal,
    shopping,
    subscription,
    tax,
    travel,
    utilities,
    vehicles,
};

export default state;
