import {BanksInterface} from '@/interfaces/banks.interface';
import {CreditCardsInterface} from '@/interfaces/credit-cards.interface';
import {InvestmentsInterface} from '@/interfaces/investments.interface';
import {IncomesInterface} from '@/interfaces/incomes.interface';
import {MedicalInterface} from '@/interfaces/medical.interface';
import {MiscellaneousInterface} from '@/interfaces/miscellaneous.interface';
import {UtilitiesInterface} from '@/interfaces/utilities.interface';
import {VehicleInterface} from '@/interfaces/vehicle.interface';
import {CommonExpenseTypeInterface} from '@/interfaces/common-expense-type.interface';

export interface BudgetTemplateInterface {
    id?: number;
    expenses: {
        banks: BanksInterface[];
        childcare: CommonExpenseTypeInterface[];
        credit_cards: CreditCardsInterface[];
        education: CommonExpenseTypeInterface[];
        entertainment: CommonExpenseTypeInterface[];
        food: CommonExpenseTypeInterface[];
        gift: CommonExpenseTypeInterface[];
        housing: CommonExpenseTypeInterface[];
        investments: InvestmentsInterface[];
        incomes: IncomesInterface[];
        loan: CommonExpenseTypeInterface[];
        medical: MedicalInterface[];
        miscellaneous: MiscellaneousInterface[];
        personal: CommonExpenseTypeInterface[];
        shopping: CommonExpenseTypeInterface[];
        subscription: CommonExpenseTypeInterface[];
        tax: CommonExpenseTypeInterface[];
        travel: CommonExpenseTypeInterface[];
        utilities: UtilitiesInterface[];
        vehicles: VehicleInterface[];
    };
}
