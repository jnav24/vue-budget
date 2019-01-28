import { Component } from 'vue-property-decorator';
import Dialogs from '@/components/dashboard/dialogs/dialogs';
import {Action, State} from 'vuex-class';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {BillsStateInterface} from '@/interfaces/bills-state.interface';
import {FormInterface} from '@/interfaces/form.interface';
import {ResponseInterface} from '@/interfaces/response.interface';
import CreditCard from '@/components/dashboard/budget-template/credit-card/CreditCard.vue';

@Component({
    components: {
        CreditCard,
    },
})
class AddBudgetExpense extends Dialogs {
    @Action public appendBudgetTemplate: () => Promise<ResponseInterface>;
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
        if (this.expenseValid) {
            this.appendBudgetTemplate()
                .then((res: ResponseInterface) => {
                    if (res.success) {
                        this.closeDialog();
                    }
                });
        }
    }
}

export default AddBudgetExpense;
