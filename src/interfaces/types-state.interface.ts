import {BillTypesInterface} from '@/interfaces/bill-types.interface';
import {BankTypesInterface} from '@/interfaces/bank-types.interface';
import {CreditCardTypesInterface} from '@/interfaces/credit-card-types.interface';
import {InvestmentTypesInterface} from '@/interfaces/investment-types.interface';
import {UtilityTypesInterface} from '@/interfaces/utility-types.interface';
import {MedicalTypesInterface} from '@/interfaces/medical-types.interface';

export interface TypesStateInterface {
    banks: BankTypesInterface[];
    bills: BillTypesInterface[];
    creditCards: CreditCardTypesInterface[];
    investments: InvestmentTypesInterface[];
    medical: MedicalTypesInterface[];
    utilities: UtilityTypesInterface[];
}
