import { Component } from 'vue-property-decorator';
import BudgetTemplateForm from '@/components/dashboard/budget-template-form/budget-template-form';
import {BudgetTemplateFormInterface} from '@/components/dashboard/budget-template-form/budget-template-form.interface';
import {FormInterface} from '@/interfaces/form.interface';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {VehicleInterface} from '@/interfaces/vehicle.interface';

@Component
class Vehicle extends BudgetTemplateForm implements BudgetTemplateFormInterface {
    protected templateForm: FormInterface = {
        make: {
            value: '',
            rules: [],
        },
        model: {
            value: '',
            rules: [],
        },
        year: {
            value: '',
            rules: [],
        },
        mileage: {
            value: '',
            rules: [],
        },
    };

    public setData(): BudgetListAddInterface {
        const data: VehicleInterface = {
            make: this.form.make.value,
            model: this.form.model.value,
            year: this.form.year.value,
            mileage: this.form.mileage.value,
        };

        return this.setDataForSaving(data, 'vehicles');
    }

    public setupForm() {
        if (typeof this.data !== 'undefined' && Object.keys(this.data).length) {
            this.editMode = true;
            this.form.make.value = this.data.make;
            this.form.model.value = this.data.model;
            this.form.year.value = this.data.value;
            this.form.mileage.value = this.data.milage;
        }
    }
}

export default Vehicle;
