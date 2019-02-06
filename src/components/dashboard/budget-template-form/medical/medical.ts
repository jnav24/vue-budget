import {Component} from 'vue-property-decorator';
import {FormInterface} from '@/interfaces/form.interface';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {timestampService, validateService} from '@/module';
import {BudgetTemplateFormInterface} from '@/components/dashboard/budget-template-form/budget-template-form.interface';
import BudgetTemplateForm from '@/components/dashboard/budget-template-form/budget-template-form';
import BudgetTemplateComponent from '@/components/dashboard/budget-template-form/BudgetTemplateForm.vue';

@Component({
    components: {
        BudgetTemplateComponent,
    },
})
class Medical extends BudgetTemplateForm implements BudgetTemplateFormInterface {
    public dates = Array.from(Array(31).keys()).map((num: any) => num + 1);
    public form: FormInterface = {
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
                        return validateService.isNumeric(v) || 'Amount has to be numeric';
                    }

                    return true;
                },
            ],
        },
        types: {
            value: 0,
            rules: [
                (v: any) => !!v || 'Select medical type',
            ],
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
            this.form.type.value = 0; // @TODO grab from data
        }
    }

    public setData(): BudgetListAddInterface {
        return {
            type: 'medical',
            data: {
                id: 'temp_' + timestampService.generateUnixId(),
                name: this.form.name.value,
                amount: this.form.amount.value,
                due_date: this.form.due.value,
                medical_type_id: this.form.type.value,
            },
        };
    }

    public validateForm(obj: { valid: boolean }) {
        this.templateValid = obj.valid;
        this.submit(this.setData());
    }
}

export default Medical;
