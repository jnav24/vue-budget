import { Vue, Component } from 'vue-property-decorator';
import {Action, State} from 'vuex-class';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {UserStateInterface} from '@/interfaces/user-state.interface';
import {FormInterface} from '@/interfaces/form.interface';
import {UserVehicleInterface} from '@/interfaces/user-vehicle.interface';
import {timestampService, validateService} from '@/module';
import {ResponseInterface} from '@/interfaces/response.interface';
import {ProfileInterface} from '@/interfaces/profile.interface';
import ConfirmDialog from '@/components/dashboard/dialogs/confirm-dialog/ConfirmDialog.vue';
import EditVehicleDialog from '@/components/dashboard/dialogs/edit-vehicle-dialog/EditVehicleDialog.vue';

Component.registerHooks([
    'mounted',
]);

@Component({
    components: {
        ConfirmDialog,
        EditVehicleDialog,
    },
})
export default class UserProfile extends Vue {
    @Action public updateUserProfile: (obj: ProfileInterface) => Promise<ResponseInterface>;
    @State((state: RootStateInterface) => state.User) public userState: UserStateInterface;
    public deleteVehicle = {
        submitText: 'Delete Vehicle',
        message: '',
    };
    public deleteVehicleDialog: boolean = false;
    public editVehicleDialog: boolean = false;
    public form: FormInterface = {
        first_name: {
            value: '',
            rules: [
                (v: any) => !!v || 'Please enter your first name',
                (v: any) => validateService.isValidLength(v, 3) || 'Minimum length is 3 characters',
            ],
        },
        last_name: {
            value: '',
            rules: [
                (v: any) => !!v || 'Please enter your last name',
                (v: any) => validateService.isValidLength(v, 3) || 'Minimum length is 3 characters',
            ],
        },
        email: {
            value: '',
            rules: [],
        },
        make: {
            value: '',
            rules: [
                (v: any) => !!v || 'Please enter a make of your vehicle',
                (v: any) => validateService.isValidLength(v, 3) || 'Minimum length is 3 characters',
            ],
        },
        model: {
            value: '',
            rules: [
                (v: any) => !!v || 'Please enter a model of your vehicle',
                (v: any) => validateService.isValidLength(v, 3) || 'Minimum length is 3 characters',
            ],
        },
        color: {
            value: '',
            rules: [
                (v: any) => !!v || 'Please enter the color of your vehicle',
                (v: any) => validateService.isValidLength(v, 3) || 'Minimum length is 3 characters',
            ],
        },
        year: {
            value: '',
            rules: [
                (v: any) => !!v || 'Please enter the year of your vehicle',
                (v: any) => validateService.isNumeric(v) || 'Only numbers are accepted',
                (v: any) => validateService.isValidLength(v, 4) || 'Must be 4 digits long',
                (v: any) => validateService.isMaxLength(v, 4) || 'Must be 4 digits long',
            ],
        },
        license: {
            value: '',
            rules: [],
        },
    };
    public profileChanged: boolean = false;
    public profileValid: boolean = false;
    public selectedVehicle: UserVehicleInterface = {} as UserVehicleInterface;
    public vehicleChanged: boolean = false;
    public vehicleValid: boolean = false;
    private tempVehicles: UserVehicleInterface[] = [];

    public get user() {
        return this.userState.user;
    }

    public get vehicles() {
        if (!this.tempVehicles.length) {
            this.tempVehicles = [...this.userState.vehicles];
        }
        return this.tempVehicles;
    }

    public set vehicles(vehicles: UserVehicleInterface[]) {
        this.tempVehicles = vehicles;
    }

    public mounted() {
        this.form.first_name.value = this.user.first_name;
        this.form.last_name.value = this.user.last_name;
        this.form.email.value = this.user.email;
    }

    public addVehicle() {
        if (this.vehicleValid) {
            this.vehicleChanged = true;
            const newVehicle: UserVehicleInterface = {
                id: 'temp_' + timestampService.generateUnixId(),
                make: this.form.make.value,
                model: this.form.model.value,
                color: this.form.color.value,
                year: this.form.year.value,
                license: this.form.license.value,
                active: 1,
            };

            this.vehicles = [ ...this.vehicles, newVehicle];
            this.resetVehicleForm();
        }
    }

    public submit() {
        if ((this.profileValid && this.profileChanged) || this.vehicleChanged ) {
            const data: ProfileInterface = {
                profile: {
                    first_name: this.form.first_name.value,
                    last_name: this.form.last_name.value,
                },
                vehicles: [ ...this.vehicles ],
            };

            this.updateUserProfile(data);
        }
    }

    public showEditVehicleDialog(vehicle: UserVehicleInterface) {
        this.editVehicleDialog = true;
        this.selectedVehicle = vehicle;
    }

    public showDeleteVehicleDialog(vehicle: UserVehicleInterface) {
        this.deleteVehicle.message = `
            Are you sure you want to delete, ${vehicle.year} ${vehicle.make} ${vehicle.model}, vehicle?
        `;
        this.deleteVehicleDialog = true;
        this.selectedVehicle = vehicle;
    }

    public emitDeleteVehicle(val: number) {
        if (val) {
            this.setVehicleAsInactive();
            this.vehicleChanged = true;
        }

        this.selectedVehicle = {} as UserVehicleInterface;
    }

    public updateDeleteVehicleDialog(val: boolean) {
        this.deleteVehicleDialog = val;
    }

    public updateEditVehicleDialog(val: boolean) {
        this.editVehicleDialog = val;
    }

    public updateVehicleData(vehicle: UserVehicleInterface) {
        // ...
    }

    private resetVehicleForm() {
        this.form.make.value = '';
        this.form.model.value = '';
        this.form.color.value = '';
        this.form.year.value = '';
        this.form.license.value = '';
        const refs: any = this.$refs.vehicleForm;
        refs.reset();
    }

    private setVehicleAsInactive() {
        const index = this.vehicles.findIndex((vehicle: UserVehicleInterface) => {
            return vehicle.id === this.selectedVehicle.id;
        });

        if (index > -1) {
            this.selectedVehicle.active = 0;
            Vue.set(this.vehicles, index, this.selectedVehicle);
        }
    }
}
