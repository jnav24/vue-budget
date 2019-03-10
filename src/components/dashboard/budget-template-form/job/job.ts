import { Component } from 'vue-property-decorator';
import BudgetTemplateForm from '@/components/dashboard/budget-template-form/budget-template-form';
import {BudgetTemplateFormInterface} from '@/components/dashboard/budget-template-form/budget-template-form.interface';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {FormInterface} from '@/interfaces/form.interface';
import {timestampService, validateService} from '@/module';
import BudgetTemplateComponent from '@/components/dashboard/budget-template-form/BudgetTemplateForm.vue';
import {JobsInterface} from '@/interfaces/jobs.interface';

@Component({
    components: {
        BudgetTemplateComponent,
    },
})
class Job extends BudgetTemplateForm implements BudgetTemplateFormInterface {
    public picker: boolean = false;
    protected templateForm: FormInterface = {
        name: {
            value: '',
            rules: [
                (v: any) => !!v || 'Name is required',
            ],
        },
        amount: {
            value: '',
            rules: [
                (v: any) => {
                    if (!!v) {
                        return validateService.isDollarAmount(v) || 'Not a valid dollar amount';
                    }

                    return true;
                },
            ],
        },
        pay_period: {
            value: '',
            rules: [],
        },
        initial_pay_date: {
            value: '',
            rules: [],
        },
    };

    public get payPeriods() {
        return this.typesState.jobs;
    }

    public setupForm() {
        if (typeof this.data !== 'undefined' && Object.keys(this.data).length) {
            this.editMode = true;
            this.form.name.value = this.data.name;
            this.form.amount.value = this.data.amount;
            this.form.pay_period.value = this.data.job_type_id;
            this.form.initial_pay_date.value = timestampService.format(this.data.initial_pay_date, 'YYYY-MM-DD');
        } else {
            this.form.initial_pay_date.value = timestampService.format('', 'YYYY-MM-DD');
        }
    }

    public setData(): BudgetListAddInterface {
        const data: JobsInterface = {
            name: this.form.name.value,
            amount: this.form.amount.value,
            job_type_id: this.form.pay_period.value,
            initial_pay_date: this.form.initial_pay_date.value,
        };

        return this.setDataForSaving(data, 'jobs');
    }
}

export default Job;
