import { Component } from 'vue-property-decorator';
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

    public emitVehicleData(data: { valid: boolean; form: UserVehicleInterface }) {
        console.log(data);
        this.formValid = data.valid;
    }
}
