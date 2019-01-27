import { Component } from 'vue-property-decorator';
import Dialogs from '@/components/dashboard/dialogs/dialogs';
import {State} from 'vuex-class';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {BillsStateInterface} from '@/interfaces/bills-state.interface';
import {FormInterface} from '@/interfaces/form.interface';

@Component
class AddBudgetExpense extends Dialogs {
    @State((state: RootStateInterface) => state.Bills) public bills: BillsStateInterface;
    public expenseValid: boolean = false;
    public form: FormInterface = {
        type: {
            value: '',
            rules: [
                (v: any) => !!v || 'Please select a type',
            ],
        },
    };

    public get billTypes() {
        return this.bills.types;
    }

    public submit() {
        this.closeDialog();
    }
}

export default AddBudgetExpense;
