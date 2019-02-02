import {BillTypesInterface} from '@/interfaces/bill-types.interface';
import {BankTypesInterface} from '@/interfaces/bank-types.interface';
import {CreditCardTypesInterface} from '@/interfaces/credit-card-types.interface';
import {InvestmentTypesInterface} from '@/interfaces/investment-types.interface';
import {UtilityTypesInterface} from '@/interfaces/utility-types.interface';

export interface TypesStateInterface {
    bank: BankTypesInterface[];
    bill: BillTypesInterface[];
    creditCard: CreditCardTypesInterface[];
    investment: InvestmentTypesInterface[];
    utility: UtilityTypesInterface[];
}
