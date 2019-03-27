import { Vue, Component } from 'vue-property-decorator';
import {Action, State} from 'vuex-class';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {UserStateInterface} from '@/interfaces/user-state.interface';
import {FormInterface} from '@/interfaces/form.interface';
import {UserVehicleInterface} from '@/interfaces/user-vehicle.interface';
import {timestampService} from '@/module';
import {ResponseInterface} from '@/interfaces/response.interface';
import {ProfileInterface} from '@/interfaces/profile.interface';

Component.registerHooks([
    'mounted',
]);

@Component
export default class UserProfile extends Vue {
    @Action public updateUserProfile: (obj: ProfileInterface) => Promise<ResponseInterface>;
    @State((state: RootStateInterface) => state.User) public userState: UserStateInterface;
    public form: FormInterface = {
        first_name: {
            value: '',
            rules: [],
        },
        last_name: {
            value: '',
            rules: [],
        },
        email: {
            value: '',
            rules: [],
        },
        make: {
            value: '',
            rules: [],
        },
        model: {
            value: '',
            rules: [],
        },
        color: {
            value: '',
            rules: [],
        },
        year: {
            value: '',
            rules: [],
        },
    };
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
        if (true) {
            const newVehicle: UserVehicleInterface = {
                id: 'temp_' + timestampService.generateUnixId(),
                make: this.form.make.value,
                model: this.form.model.value,
                color: this.form.color.value,
                year: this.form.year.value,
            };

            this.vehicles = [ ...this.vehicles, newVehicle];
            this.resetVehicleForm();
        }
    }

    public submit() {
        if (true) {
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

    private resetVehicleForm() {
        this.form.make.value = '';
        this.form.model.value = '';
        this.form.color.value = '';
        this.form.year.value = '';
    }
}
