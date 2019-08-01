import {Component} from 'vue-property-decorator';
import {FormInterface} from '@/interfaces/form.interface';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {validateService} from '@/module';
import {BudgetTemplateFormInterface} from '@/components/dashboard/budget-template-form/budget-template-form.interface';
import BudgetTemplateForm from '@/components/dashboard/budget-template-form/budget-template-form';
import BudgetTemplateComponent from '@/components/dashboard/budget-template-form/BudgetTemplateForm.vue';
import ConfirmationForm from '@/components/dashboard/confirmation-form/ConfirmationForm.vue';
import {MedicalInterface} from '@/interfaces/medical.interface';

@Component({
    components: {
        BudgetTemplateComponent,
        ConfirmationForm,
    },
})
class Medical extends BudgetTemplateForm implements BudgetTemplateFormInterface {
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
                (v: any) => !!v || 'Select medical type',
            ],
        },
        not_track_amount: {
            value: 0,
            rules: [],
        },
    };

    public get types() {
        return this.typesState.medical;
    }

    public setupForm() {
        if (typeof this.data !== 'undefined' && Object.keys(this.data).length) {
            this.editMode = true;
            this.form.name.value = this.data.name;
            this.form.amount.value = this.data.amount;
            this.form.due.value = this.data.due_date;
            this.form.type.value = this.data.medical_type_id;
            this.form.not_track_amount.value = this.data.not_track_amount;
            this.setupPaidData();
        }
    }

    public setData(): BudgetListAddInterface {
        const data: MedicalInterface = {
            name: this.form.name.value,
            amount: this.form.amount.value,
            due_date: this.form.due.value,
            medical_type_id: this.form.type.value,
            not_track_amount: Number(this.form.not_track_amount.value),
        };

        return this.setDataForSaving(data, 'medical');
    }
}

export default Medical;
