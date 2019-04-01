import { Component } from 'vue-property-decorator';
import BudgetTemplateComponent from '@/components/dashboard/budget-template-form/BudgetTemplateForm.vue';
import BudgetTemplateForm from '@/components/dashboard/budget-template-form/budget-template-form';
import {BudgetTemplateFormInterface} from '@/components/dashboard/budget-template-form/budget-template-form.interface';
import ConfirmationForm from '@/components/dashboard/confirmation-form/ConfirmationForm.vue';
import {FormInterface} from '@/interfaces/form.interface';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {VehicleInterface} from '@/interfaces/vehicle.interface';
import {validateService} from '@/module';
import {UserVehicleInterface} from '@/interfaces/user-vehicle.interface';
import {VehicleTypesInterface} from '@/interfaces/vehicle-types.interface';

@Component({
    components: {
        BudgetTemplateComponent,
        ConfirmationForm,
    },
})
class Vehicle extends BudgetTemplateForm implements BudgetTemplateFormInterface {
    public tableHeaders = [
        'select',
        'make',
        'model',
        'year',
        'mileage',
        'actions',
    ];
    protected templateForm: FormInterface = {
        vehicle: {
            value: 0,
            rules: [],
        },
        mileage: {
            value: '',
            rules: [],
        },
        type: {
            value: '',
            rules: [
                (v: any) => !!v || 'Name is required',
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
    };

    public get vehicles() {
        return this.setVehicles(this.userState.vehicles);
    }

    public setVehicles(vehicles: UserVehicleInterface[]): Array<{ id: string | number; value: string }> {
        const result: Array<{ id: string | number; value: string }> = [];

        for (const vehicle of vehicles) {
            result.push({
                id: vehicle.id,
                value: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
            });
        }

        return result;
    }

    public get types() {
        return this.typesState.vehicles;
    }

    public setData(): BudgetListAddInterface {
        const data: VehicleInterface = {
            vehicle: this.form.vehicle.value,
            mileage: this.form.mileage.value,
            vehicle_type_id: this.form.type.value,
            due_date: this.form.due.value,
            amount: this.form.amount.value,
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

    public getTypeId(value: string): number {
        const index = this.typesState.vehicles.findIndex((obj: VehicleTypesInterface) => obj.slug === value);

        if (index > -1) {
            return this.typesState.vehicles[index].id;
        }

        return 0;
    }
}

export default Vehicle;
