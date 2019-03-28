import { Component } from 'vue-property-decorator';
import Dialogs from '@/components/dashboard/dialogs/dialogs';
import EditVehicleForm from '@/components/dashboard/forms/edit-vehicle-form/EditVehicleForm.vue';

@Component({
    components: {
        EditVehicleForm,
    },
})
export default class EditVehicleDialog extends Dialogs {}
