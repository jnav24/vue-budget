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
class Bank extends BudgetTemplateForm implements BudgetTemplateFormInterface {
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

    public get types() {
        return this.typesState.banks;
    }

    public setupForm() {
        if (typeof this.data !== 'undefined' && Object.keys(this.data).length) {
            this.editMode = true;
            this.form.name.value = this.data.name;
            this.form.amount.value = this.data.amount;
            this.form.type.value = 0; // @TODO grab from data
        }
    }

    public setData(): BudgetListAddInterface {
        const data = {
            name: this.form.name.value,
            amount: this.form.amount.value,
            bank_type_id: this.form.type.value,
        };

        return this.setDataForSaving(data, 'banks');
    }

    public validateForm(obj: { valid: boolean; update: boolean }) {
        this.templateValid = obj.valid;
        if (obj.update) {
            this.updateSubmit(this.setData());
        } else {
            this.submit(this.setData());
        }
    }
}

export default Bank;
