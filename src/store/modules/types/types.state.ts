import {BillTypesInterface} from '@/interfaces/bill-types.interface';
import {TypesStateInterface} from '@/store/modules/types/types-state.interface';
import {CommonExpenseTypeInterface} from '@/interfaces/common-expense-type.interface';

const banks: CommonExpenseTypeInterface[] = [];
const bills: BillTypesInterface[] = [];
const childcare: CommonExpenseTypeInterface[] = [];
const creditCards: CommonExpenseTypeInterface[] = [];
const education: CommonExpenseTypeInterface[] = [];
const entertainment: CommonExpenseTypeInterface[] = [];
const food: CommonExpenseTypeInterface[] = [];
const gift: CommonExpenseTypeInterface[] = [];
const housing: CommonExpenseTypeInterface[] = [];
const incomes: CommonExpenseTypeInterface[] = [];
const investments: CommonExpenseTypeInterface[] = [];
const loan: CommonExpenseTypeInterface[] = [];
const medical: CommonExpenseTypeInterface[] = [];
const personal: CommonExpenseTypeInterface[] = [];
const shopping: CommonExpenseTypeInterface[] = [];
const subscription: CommonExpenseTypeInterface[] = [];
const tax: CommonExpenseTypeInterface[] = [];
const travel: CommonExpenseTypeInterface[] = [];
const utilities: CommonExpenseTypeInterface[] = [];
const vehicles: CommonExpenseTypeInterface[] = [];

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
