import { Component, Watch } from 'vue-property-decorator';
import Dialogs from '@/components/dashboard/dialogs/dialogs';
import {State} from 'vuex-class';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {BillsStateInterface} from '@/interfaces/bills-state.interface';
import {FormInterface} from '@/interfaces/form.interface';
import Bank from '@/components/dashboard/budget-template-form/bank/Bank.vue';
import CreditCard from '@/components/dashboard/budget-template-form/credit-card/CreditCard.vue';
import Investment from '@/components/dashboard/budget-template-form/investment/Investment.vue';
import Medical from '@/components/dashboard/budget-template-form/medical/Medical.vue';
import Misc from '@/components/dashboard/budget-template-form/misc/Misc.vue';
import Utility from '@/components/dashboard/budget-template-form/utility/Utility.vue';
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
        if (typeof this.form.type.value !== 'undefined' && this.form.type.value) {
            const index = this.billTypes.findIndex((num: BillTypesInterface) => num.id === this.form.type.value);
            this.selectedType = this.billTypes[index].slug;
        }
    }

    @Watch('dialog')
    private updateForm() {
        if (!this.showDialog) {
            this.resetForm();
        }
    }

    private resetForm() {
        this.selectedType = '';
        const ref: any = this.$refs.expenseForm;
        ref.reset();
    }
}

export default AddBudgetExpense;
