import { Vue, Component } from 'vue-property-decorator';
import {Action, State} from 'vuex-class';
import {ResponseInterface} from '@/interfaces/response.interface';
import {responseService, validateService} from '@/module';
import {FormInterface} from '@/interfaces/form.interface';
import {AlertInterface} from '@/interfaces/alert.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {ControlsStateInterface} from '@/store/modules/controls/controls-state.interface';

@Component
class Register extends Vue {
    @Action public registerUser: (obj: any) => Promise<ResponseInterface>;
    @State((state: RootStateInterface) => state.Controls) public controlsState: ControlsStateInterface;
    public alert: AlertInterface = {
        type: 'error',
        msg: '',
        display: false,
    };
    public registerValid: boolean = false;
    public form: FormInterface = {
        first_name: {
            value: '',
            rules: [
                (v: any) => !!v || 'First name is required',
                (v: any) => v.length >= 3 || '',
            ],
        },
        last_name: {
            value: '',
            rules: [
                (v: any) => !!v || 'Last name is required',
                (v: any) => v.length >= 3 || '',
            ],
        },
        phone_number: {
            value: '',
            rules: [
                (v: any) => !!v || 'Phone number is required',
                (v: any) => this.validatePhoneNumber() || 'Phone number should be in proper format',
            ],
        },
        username: {
            value: '',
            rules: [
                (v: any) => !!v || 'Email is required',
                (v: any) => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
        },
        password: {
            value: '',
            rules: [
                (v: any) => !!v || 'Password is required',
                (v: any) => validateService.isValidLength(v) || 'Password is not long enough',
                (v: any) => validateService.isUppercasePresent(v) || 'Password must contain uppercase letters',
                (v: any) => validateService.isLowercasePresent(v) || 'Password must contain lowercase letters',
                (v: any) => validateService.isNumberPresent(v) || 'Password must contain numbers',
                (v: any) => validateService.hasSpecialCharacters(v) ||
                    'Password must contain at least one of the following special character (!$#%)',
                (v: any) => this.checkPassword() || 'Passwords has to match',
            ],
        },
        confirm_password: {
            value: '',
            rules: [
                (v: any) => !!v || 'Confirm password is required',
                (v: any) => this.checkPassword() || 'Passwords has to match',
                (v: any) => validateService.isValidLength(v) || '',
            ],
        },
    };

    public get phoneNumberFormat(): string {
        return this.form.phone_number.value.toString()
            .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }

    public set phoneNumberFormat(phone: string) {
        this.form.phone_number.value = phone;
    }

    public get showRegisterForm() {
        return this.controlsState.canRegister;
    }

    public validateAll() {
        const refs: any = this.$refs.registerForm;
        refs.validate();
    }

    public submit() {
        this.registerUser(this.form)
            .then((res: ResponseInterface) => {
                if (res.success) {
                    this.alert.display = false;
                    this.$router.push({ name: 'dashboard' });
                    return true;
                }

                this.alert.display = true;
                this.alert.msg = res.msg;
                return false;
            })
            .catch((error: any) => {
                const response: ResponseInterface = responseService.getFailedResponse();
                this.alert.display = true;
                this.alert.msg = response.msg;
            });
    }

    private checkPassword(): boolean {
        return this.form.confirm_password.value === this.form.password.value;
    }

    /**
     * May support foreign numbers in the future
     */
    private validatePhoneNumber(): boolean | number {
        const phone = this.phoneNumberFormat.replace(/\s+-()/, '');
        return /^\((\d{3})\)\s(\d{3})-(\d{4})$/.test(phone);
    }
}

export default Register;
