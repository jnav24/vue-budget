import {Component} from 'vue-property-decorator';
import {FormInterface} from '@/interfaces/form.interface';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {validateService} from '@/module';
import {BudgetTemplateFormInterface} from '@/components/dashboard/budget-template-form/budget-template-form.interface';
import BudgetTemplateForm from '@/components/dashboard/budget-template-form/budget-template-form';
import BudgetTemplateComponent from '@/components/dashboard/budget-template-form/BudgetTemplateForm.vue';
import ConfirmationForm from '@/components/dashboard/confirmation-form/ConfirmationForm.vue';
import {MiscellaneousInterface} from '@/interfaces/miscellaneous.interface';

@Component({
    components: {
        BudgetTemplateComponent,
        ConfirmationForm,
    },
})
class Misc extends BudgetTemplateForm implements BudgetTemplateFormInterface {
    public dates = Array.from(Array(31).keys()).map((num: any) => num + 1);
    protected templateForm: FormInterface = {
        name: {
            value: '',
            rules: [
                (v: any) => !!v || 'Name is required',
                (v: any) => validateService.isValidLength(v, 3) || 'Name is not long enough',
            ],
        },
        track_total: {
            value: 0,
            rules: [],
        },
        due: {
            value: 0,
            rules: [
                (v: any) => !!v || 'Due date is required',
            ],
        },
        amount: {
            value: 0,
            rules: [
                (v: any) => {
                    if (!!v) {
                        return validateService.isDollarAmount(v) || 'Not a valid dollar amount';
                    }

                    return true;
                },
            ],
        },
    };

    public setupForm() {
        if (typeof this.data !== 'undefined' && Object.keys(this.data).length) {
            this.editMode = true;
            this.form.name.value = this.data.name;
            this.form.amount.value = this.data.amount;
            this.form.due.value = this.data.due_date;
            this.form.track_total.value = this.data.track_total;
            this.setupPaidData();
        }
    }

    public setData(): BudgetListAddInterface {
        const data: MiscellaneousInterface = {
            name: this.form.name.value,
            amount: this.form.amount.value,
            due_date: this.form.due.value,
            track_total: Number(this.form.track_total.value),
        };

        return this.setDataForSaving(data, 'miscellaneous');
    }
}

export default Misc;
