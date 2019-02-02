import {BillTypesInterface} from '@/interfaces/bill-types.interface';

export interface TypesStateInterface {
    bank: any;
    bill: BillTypesInterface[];
    creditCard: any;
    investment: any;
    utility: any;
}
