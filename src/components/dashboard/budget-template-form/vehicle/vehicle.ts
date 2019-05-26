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
import EmptyState from '@/components/dashboard/empty-state/EmptyState.vue';

@Component({
    components: {
        BudgetTemplateComponent,
        ConfirmationForm,
        EmptyState,
    },
})
class Vehicle extends BudgetTemplateForm implements BudgetTemplateFormInterface {
    public oldVehicles: boolean = false;
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
            value: 1,
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
        not_track_amount: {
            value: 0,
            rules: [],
        },
    };

    public get vehicles() {
        return this.setVehicles(this.userState.vehicles);
    }

    public setVehicles(vehicles: UserVehicleInterface[]): Array<{ id: string | number; value: string }> {
        const result: Array<{ id: string | number; value: string }> = [];

        for (const vehicle of vehicles) {
            if (!vehicle.active && !this.oldVehicles) {
                continue;
            }

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
            mileage: this.form.mileage.value || '',
            amount: this.form.amount.value,
            user_vehicle_id: this.form.vehicle.value,
            vehicle_type_id: this.form.type.value,
            due_date: this.form.due.value,
            not_track_amount: Number(this.form.not_track_amount.value),
        };

        return this.setDataForSaving(data, 'vehicles');
    }

    public setupForm() {
        if (typeof this.data !== 'undefined' && Object.keys(this.data).length) {
            this.editMode = true;
            this.form.vehicle.value = this.data.user_vehicle_id;
            this.form.mileage.value = this.data.mileage;
            this.form.type.value = this.data.vehicle_type_id;
            this.form.due.value = this.data.due_date;
            this.form.amount.value = this.data.amount;
            this.form.not_track_amount.value = this.data.not_track_amount;
            this.setupPaidData();
        }
    }

    public getTypeId(value: string): number {
        const index = this.typesState.vehicles.findIndex((obj: VehicleTypesInterface) => obj.slug === value);

        if (index > -1) {
            return this.typesState.vehicles[index].id;
        }

        return 0;
    }

    public goToSettings() {
        this.$router.push({ name: 'profile' });
    }

    public resetChosenVehicle() {
        this.form.vehicle.value = 0;
    }
}

export default Vehicle;
