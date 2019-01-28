import { Component } from 'vue-property-decorator';
import Dialogs from '@/components/dashboard/dialogs/dialogs';
import {State} from 'vuex-class';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {BillsStateInterface} from '@/interfaces/bills-state.interface';
import {FormInterface} from '@/interfaces/form.interface';
import Bank from '@/components/dashboard/budget-template/bank/Bank.vue';
import CreditCard from '@/components/dashboard/budget-template/credit-card/CreditCard.vue';
import Investment from '@/components/dashboard/budget-template/investment/Investment.vue';
import Medical from '@/components/dashboard/budget-template/medical/Medical.vue';
import Misc from '@/components/dashboard/budget-template/misc/Misc.vue';
import Utility from '@/components/dashboard/budget-template/utility/Utility.vue';
import {BillTypesInterface} from '@/interfaces/bill-types.interface';

@Component({
    components: {
        Bank,
        CreditCard,
        Investment,
        Medical,
        Misc,
        Utility,
    },
})
class AddBudgetExpense extends Dialogs {
    @State((state: RootStateInterface) => state.Bills) public bills: BillsStateInterface;
    public expenseValid: boolean = false;
    public form: FormInterface = {
        type: {
            value: 0,
            rules: [
                (v: any) => !!v || 'Please select a type',
            ],
        },
    };
    public selectedType: string = '';

    public get billTypes() {
        return this.bills.types;
    }

    public showTypeForm(type: string): boolean {
        return this.selectedType === type;
    }

    public updateSelectedType() {
        const index = this.billTypes.findIndex((num: BillTypesInterface) => num.id === this.form.type.value);
        this.selectedType = this.billTypes[index].slug;
    }
}

export default AddBudgetExpense;
