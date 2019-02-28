import { Component } from 'vue-property-decorator';
import BudgetTemplateForm from '@/components/dashboard/budget-template-form/budget-template-form';
import {BudgetTemplateFormInterface} from '@/components/dashboard/budget-template-form/budget-template-form.interface';
import {FormInterface} from '@/interfaces/form.interface';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';

@Component
class Vehicle extends BudgetTemplateForm implements BudgetTemplateFormInterface {
    protected templateForm: FormInterface = {};

    public setData(): BudgetListAddInterface {
        return {} as BudgetListAddInterface;
    }

    public setupForm() {
        // ...
    }

    public validateForm(obj: { valid: boolean }) {
        // ...
    }
}

export default Vehicle;
