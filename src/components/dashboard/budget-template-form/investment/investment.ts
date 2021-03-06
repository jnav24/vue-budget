import {Component} from 'vue-property-decorator';
import {FormInterface} from '@/interfaces/form.interface';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {validateService} from '@/module';
import BudgetTemplateComponent from '@/components/dashboard/budget-template-form/BudgetTemplateForm.vue';
import {BudgetTemplateFormInterface} from '@/components/dashboard/budget-template-form/budget-template-form.interface';
import BudgetTemplateForm from '@/components/dashboard/budget-template-form/budget-template-form';
import {InvestmentsInterface} from '@/interfaces/investments.interface';

@Component({
    components: {
        BudgetTemplateComponent,
    },
})
class Investment extends BudgetTemplateForm implements BudgetTemplateFormInterface {
    protected templateForm: FormInterface = {
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
                        return validateService.isDollarAmount(v) || 'Not a valid dollar amount';
                    }

                    return true;
                },
            ],
        },
    };

    public get types() {
        return this.typesState.investments;
    }

    public setupForm() {
        if (typeof this.data !== 'undefined' && Object.keys(this.data).length) {
            this.editMode = true;
            this.form.name.value = this.data.name;
            this.form.amount.value = this.data.amount;
            this.form.type.value = this.data.investment_type_id;
        }
    }

    public setData(): BudgetListAddInterface {
        const data: InvestmentsInterface = {
            name: this.form.name.value,
            amount: this.form.amount.value,
            investment_type_id: this.form.type.value,
        };

        return this.setDataForSaving(data, 'investments');
    }
}

export default Investment;
