import { Component } from 'vue-property-decorator';
import BudgetTemplateForm from '@/components/dashboard/budget-template-form/budget-template-form';
import {BudgetTemplateFormInterface} from '@/components/dashboard/budget-template-form/budget-template-form.interface';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {FormInterface} from '@/interfaces/form.interface';
import {timestampService} from '@/module';
import BudgetTemplateComponent from '@/components/dashboard/budget-template-form/BudgetTemplateForm.vue';

@Component({
    components: {
        BudgetTemplateComponent,
    },
})
class Job extends BudgetTemplateForm implements BudgetTemplateFormInterface {
    public form: FormInterface = {
        name: {
            value: '',
            rules: [
                (v: any) => !!v || 'Name is required',
            ],
        },
        amount: {
            value: '',
            rules: [],
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
    public payPeriods: any = [
        { value: '1', text: 'Weekly' },
        { value: '2', text: 'Bi-Weekly' },
        { value: '3', text: 'Semi-Monthly' },
        { value: '4', text: 'Monthly' },
    ];
    public picker: boolean = false;

    public setupForm() {
        if (typeof this.data !== 'undefined' && Object.keys(this.data).length) {
            this.editMode = true;
            this.form.name.value = this.data.name;
            this.form.amount.value = this.data.amount;
            this.form.pay_period.value = this.data.pay_period;
            this.form.initial_pay_date = this.data.initial_pay_date;
        } else {
            this.form.initial_pay_date.value = timestampService.format('', 'YYYY-MM-DD');
        }
    }

    public setData(): BudgetListAddInterface {
        return {
            type: 'job',
            data: {
                id: 'temp_' + timestampService.generateUnixId(),
                name: this.form.name.value,
                amount: this.form.amount.value,
                pay_period: this.form.pay_period.value,
                initial_pay_date: this.form.initial_pay_date.value,
            },
        };
    }

    public validateForm(obj: { valid: boolean }) {
        this.templateValid = obj.valid;
        this.submit(this.setData());
    }
}

export default Job;
