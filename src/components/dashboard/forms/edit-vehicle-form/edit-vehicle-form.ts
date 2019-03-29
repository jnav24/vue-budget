import {Vue, Component, Emit, Prop} from 'vue-property-decorator';
import {validateService} from '@/module';
import {FormInterface} from '@/interfaces/form.interface';
import {UserVehicleInterface} from '@/interfaces/user-vehicle.interface';
import {timestampService} from '@/module';

Component.registerHooks([
    'mounted',
]);

@Component
export default class EditVehicleForm extends Vue {
    @Prop({
        default: (): UserVehicleInterface => {
            return {
                id: timestampService.generateTempId(),
                active: 1,
                make: '',
                model: '',
                year: '',
                color: '',
            };
        },
    }) public data: UserVehicleInterface;
    public form: FormInterface = {
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
    public vehicleChanged: boolean = false;
    public vehicleValid: boolean = false;

    public mounted() {
        this.setupForm();
    }

    public setupForm() {
        if (typeof this.data !== 'undefined' && Object.keys(this.data).length) {
            this.form.make.value = this.data.make;
            this.form.model.value = this.data.model;
            this.form.color.value = this.data.color;
            this.form.year.value = this.data.year;
            this.form.license.value = this.data.license;
            this.setupEmitFormData();
        }
    }

    public updateFormData() {
        this.vehicleChanged = true;
        setTimeout(() => {
            this.setupEmitFormData();
        }, 10);
    }

    private setupEmitFormData() {
        const data = {
            valid: this.vehicleChanged && this.vehicleValid,
            form: {
                id: this.data.id,
                make: this.form.make.value,
                model: this.form.model.value,
                color: this.form.color.value,
                year: this.form.year.value,
                active: this.data.active,
            },
        };
        this.updateData(data);
    }

    @Emit('updateData')
    private updateData(data: { valid: boolean; form: UserVehicleInterface }) {
        // ...
    }
}
