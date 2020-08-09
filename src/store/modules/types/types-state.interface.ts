import {BillTypesInterface} from '@/interfaces/bill-types.interface';
import {BankTypesInterface} from '@/interfaces/bank-types.interface';
import {CreditCardTypesInterface} from '@/interfaces/credit-card-types.interface';
import {InvestmentTypesInterface} from '@/interfaces/investment-types.interface';
import {UtilityTypesInterface} from '@/interfaces/utility-types.interface';
import {MedicalTypesInterface} from '@/interfaces/medical-types.interface';
import {JobTypesInterface} from '@/interfaces/job-types.interface';
import {VehicleTypesInterface} from '@/interfaces/vehicle-types.interface';
import {CommonExpenseTypeInterface} from '@/interfaces/common-expense-type.interface';

export interface TypesStateInterface {
    banks: BankTypesInterface[];
    bills: BillTypesInterface[];
    childcare: CommonExpenseTypeInterface[];
    creditCards: CreditCardTypesInterface[];
    education: CommonExpenseTypeInterface[];
    entertainment: CommonExpenseTypeInterface[];
    food: CommonExpenseTypeInterface[];
    gift: CommonExpenseTypeInterface[];
    housing: CommonExpenseTypeInterface[];
    investments: InvestmentTypesInterface[];
    incomes: JobTypesInterface[];
    loan: CommonExpenseTypeInterface[];
    medical: MedicalTypesInterface[];
    personal: CommonExpenseTypeInterface[];
    shopping: CommonExpenseTypeInterface[];
    subscription: CommonExpenseTypeInterface[];
    tax: CommonExpenseTypeInterface[];
    travel: CommonExpenseTypeInterface[];
    utilities: UtilityTypesInterface[];
    vehicles: VehicleTypesInterface[];
}
