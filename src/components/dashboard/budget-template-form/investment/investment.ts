import {Component} from 'vue-property-decorator';
import {FormInterface} from '@/interfaces/form.interface';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {timestampService, validateService} from '@/module';
import BudgetTemplateComponent from '@/components/dashboard/budget-template-form/BudgetTemplateForm.vue';
import {BudgetTemplateFormInterface} from '@/components/dashboard/budget-template-form/budget-template-form.interface';
import BudgetTemplateForm from '@/components/dashboard/budget-template-form/budget-template-form';

@Component({
    components: {
        BudgetTemplateComponent,
    },
})
class Investment extends BudgetTemplateForm implements BudgetTemplateFormInterface {
    public form: FormInterface = {
        name: {
            value: '',
            rules: [
                (v: any) => !!v || 'Name is required',
                (v: any) => validateService.isValidLength(v, 3) || 'Name is not long enough',
            ],
        },
        type: {
            value: '',
            rules: [
                (v: any) => !!v || 'Name is required',
            ],
        },
        amount: {
            value: 0,
            rules: [
                (v: any) => {
                    if (!!v) {
                        return validateService.isNumeric(v) || 'Amount has to be numeric';
                    }

                    return true;
                },
            ],
        },
    };
    public types = [
        { value: 'stocks', label: 'Stocks' },
        { value: 'crypto', label: 'Crypto' },
        { value: '401k', label: '401k' },
        { value: 'irs', label: 'IRA' },
    ];

    public setupForm() {
        this.form.name.value = this.data.name;
        this.form.amount.value = this.data.amount;
        this.form.type.value = this.data.type;
    }

    public setData(): BudgetListAddInterface {
        return {
            type: 'investment',
            data: {
                id: 'temp_' + timestampService.generateUnixId(),
                name: this.form.name.value,
                amount: this.form.amount.value,
                type: this.form.type.value,
            },
        };
    }

    protected validateForm(obj: { valid: boolean }) {
        this.templateValid = obj.valid;
        this.submit(this.setData());
    }
}

export default Investment;
