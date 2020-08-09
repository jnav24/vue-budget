import { Component, Prop } from 'vue-property-decorator';
import BudgetTemplateForm from '@/components/dashboard/budget-template-form/budget-template-form';
import BudgetTemplateComponent from '@/components/dashboard/budget-template-form/BudgetTemplateForm.vue';
import {BudgetTemplateFormInterface} from '@/components/dashboard/budget-template-form/budget-template-form.interface';
import {globalService, validateService} from '@/module';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import ConfirmationForm from '@/components/dashboard/confirmation-form/ConfirmationForm.vue';
import {FormInterface} from '@/interfaces/form.interface';

@Component({
    components: {
        BudgetTemplateComponent,
        ConfirmationForm,
    },
})
export default class CommonExpense extends BudgetTemplateForm implements BudgetTemplateFormInterface {
    @Prop({ required: true }) protected type: string;

    protected templateForm: FormInterface = {
        name: {
            value: '',
            rules: [
                (v: any) => !!v || 'Name is required',
                (v: any) => validateService.isValidLength(v, 3) || 'Name is not long enough',
            ],
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
        type: {
            value: 0,
            rules: [
                (v: any) => !!v || 'Select type',
            ],
        },
        not_track_amount: {
            value: 0,
            rules: [],
        },
    };

    public get types() {
        return (this as any).typesState[this.type];
    }

    public getExpenseType(): string {
        return globalService.ucFirst(this.type);
    }

    public setupForm() {
        if (typeof this.data !== 'undefined' && Object.keys(this.data).length) {
            this.editMode = true;
            this.form.name.value = this.data.name;
            this.form.amount.value = this.data.amount;
            this.form.due.value = this.data.due_date;
            this.form.type.value = this.data[`${this.type}_type_id`];
            this.form.not_track_amount.value = this.data.not_track_amount;
            this.setupPaidData();
        }
    }

    public setData(): BudgetListAddInterface {
        const data: Record<string, any> = {
            name: this.form.name.value,
            amount: this.form.amount.value,
            due_date: this.form.due.value,
            [`${this.type}_type_id`]: this.form.type.value,
            not_track_amount: Number(this.form.not_track_amount.value),
        };

        return this.setDataForSaving(data, this.type);
    }
}
