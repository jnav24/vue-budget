import {BillTypesInterface} from '@/interfaces/bill-types.interface';

export interface TypesStateInterface {
    bank: any;
    bill: BillTypesInterface[];
    credit_card: any;
    investment: any;
    utility: any;
}
