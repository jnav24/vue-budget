import {Component, Emit} from 'vue-property-decorator';
import Dialogs from '@/components/dashboard/dialogs/dialogs';
import EditVehicleForm from '@/components/dashboard/forms/edit-vehicle-form/EditVehicleForm.vue';
import {UserVehicleInterface} from '@/interfaces/user-vehicle.interface';

@Component({
    components: {
        EditVehicleForm,
    },
})
export default class EditVehicleDialog extends Dialogs {
    public formValid: boolean = false;
    public formData: UserVehicleInterface = {} as UserVehicleInterface;

    public emitVehicleData(data: { valid: boolean; form: UserVehicleInterface }) {
        this.formValid = data.valid;
        this.formData = data.form;
    }

    public submitData() {
        this.updateData(this.formData);
        this.closeDialog();
    }

    @Emit('updateData')
    private updateData(obj: UserVehicleInterface) {
        // ...
    }
}
