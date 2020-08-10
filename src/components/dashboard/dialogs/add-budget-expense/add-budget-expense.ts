import {Component, Prop, Watch, Emit} from 'vue-property-decorator';
import Dialogs from '@/components/dashboard/dialogs/dialogs';
import {State} from 'vuex-class';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {FormInterface} from '@/interfaces/form.interface';
import Bank from '@/components/dashboard/budget-template-form/bank/Bank.vue';
import CommonExpense from '@/components/dashboard/budget-template-form/common-expense/CommonExpense.vue';
import CreditCard from '@/components/dashboard/budget-template-form/credit-card/CreditCard.vue';
import Investment from '@/components/dashboard/budget-template-form/investment/Investment.vue';
import Job from '@/components/dashboard/budget-template-form/job/Job.vue';
import Medical from '@/components/dashboard/budget-template-form/medical/Medical.vue';
import Misc from '@/components/dashboard/budget-template-form/misc/Misc.vue';
import Utility from '@/components/dashboard/budget-template-form/utility/Utility.vue';
import Vehicle from '@/components/dashboard/budget-template-form/vehicle/Vehicle.vue';
import {BillTypesInterface} from '@/interfaces/bill-types.interface';
import {TypesStateInterface} from '@/store/modules/types/types-state.interface';

@Component({
    components: {
        Bank,
        CommonExpense,
        CreditCard,
        Investment,
        Job,
        Medical,
        Misc,
        Utility,
        Vehicle,
    },
})
class AddBudgetExpense extends Dialogs {
    @Prop() public cycle: string;
    @Prop() public type: number;
    @Prop() public showPaidForm: boolean;
    @State((state: RootStateInterface) => state.Types) public types: TypesStateInterface;
    public editMode: boolean = false;
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
        return this.types.bills;
    }

    public showTypeForm(type: string): boolean {
        return this.selectedType === type;
    }

    public updateSelectedType() {
        if (typeof this.form.type.value !== 'undefined' && this.form.type.value > -1) {
            const index = this.billTypes.findIndex((num: BillTypesInterface) => num.id === this.form.type.value);
            this.selectedType = this.billTypes[index].slug;
        }
    }

    public submitAndCloseDialog(data: { valid: boolean; data: any; update: boolean }) {
        this.submitBudget(data);
        this.closeDialog();
    }

    @Emit('submitBudget')
    private submitBudget(budget: { valid: boolean; data: any; update: boolean }) {
        // ...
    }

    @Watch('dialog')
    private updateForm() {
        if (!this.showDialog) {
            this.resetForm();
        } else {
            this.setupForm();
        }
    }

    private resetForm() {
        this.selectedType = '';
        this.editMode = false;
        const ref: any = this.$refs.expenseForm;
        ref.reset();
    }

    private setupForm() {
        if (typeof this.type !== 'undefined') {
            this.form.type.value = this.type;
        }

        if (typeof this.data !== 'undefined' && Object.keys(this.data).length) {
            this.editMode = true;
        }
    }
}

export default AddBudgetExpense;
