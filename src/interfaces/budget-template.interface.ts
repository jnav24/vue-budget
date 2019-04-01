import {BanksInterface} from '@/interfaces/banks.interface';
import {CreditCardsInterface} from '@/interfaces/credit-cards.interface';
import {InvestmentsInterface} from '@/interfaces/investments.interface';
import {JobsInterface} from '@/interfaces/jobs.interface';
import {MedicalInterface} from '@/interfaces/medical.interface';
import {MiscellaneousInterface} from '@/interfaces/miscellaneous.interface';
import {UtilitiesInterface} from '@/interfaces/utilities.interface';
import {VehicleInterface} from '@/interfaces/vehicle.interface';

export interface BudgetTemplateInterface {
    id?: number;
    expenses: {
        banks: BanksInterface[];
        credit_cards: CreditCardsInterface[];
        investments: InvestmentsInterface[];
        jobs: JobsInterface[];
        medical: MedicalInterface[];
        miscellaneous: MiscellaneousInterface[];
        utilities: UtilitiesInterface[];
        vehicles: VehicleInterface[];
    };
}
