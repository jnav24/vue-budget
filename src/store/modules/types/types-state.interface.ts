import {BillTypesInterface} from '@/interfaces/bill-types.interface';
import {CommonExpenseTypeInterface} from '@/interfaces/common-expense-type.interface';

export interface TypesStateInterface {
    banks: CommonExpenseTypeInterface[];
    bills: BillTypesInterface[];
    childcare: CommonExpenseTypeInterface[];
    creditCards: CommonExpenseTypeInterface[];
    education: CommonExpenseTypeInterface[];
    entertainment: CommonExpenseTypeInterface[];
    food: CommonExpenseTypeInterface[];
    gift: CommonExpenseTypeInterface[];
    housing: CommonExpenseTypeInterface[];
    investments: CommonExpenseTypeInterface[];
    incomes: CommonExpenseTypeInterface[];
    loan: CommonExpenseTypeInterface[];
    medical: CommonExpenseTypeInterface[];
    personal: CommonExpenseTypeInterface[];
    shopping: CommonExpenseTypeInterface[];
    subscription: CommonExpenseTypeInterface[];
    tax: CommonExpenseTypeInterface[];
    travel: CommonExpenseTypeInterface[];
    utilities: CommonExpenseTypeInterface[];
    vehicles: CommonExpenseTypeInterface[];
}
