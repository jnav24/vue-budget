import { Vue, Component } from 'vue-property-decorator';
import {Action} from 'vuex-class';
import {ResponseInterface} from '@/interfaces/response.interface';
import {AlertInterface} from '@/interfaces/alert.interface';
import {validateService} from '@/module';

@Component
export default class UserSecurity extends Vue {
    @Action public resetPassword: (password: string) => Promise<ResponseInterface>;
    public alert: AlertInterface = {
        display: false,
        type: 'error',
        msg: '',
    };
    public formValid: boolean = false;
    public form: any = {
        current_password: {
            value: '',
            rules: [
                (v: string) => !!v || 'Password is required',
                (v: string) => validateService.isValidLength(v) || '',
            ],
        },
        new_password: {
            value: '',
            rules: [
                (v: string) => !!v || 'Password is required',
                (v: string) => this.checkPasswordMatchOldPassword() || 'Password must be different than old password',
                (v: string) => validateService.isValidLength(v) || 'Password is not long enough',
                (v: string) => validateService.isUppercasePresent(v) || 'Password must contain uppercase letters',
                (v: string) => validateService.isLowercasePresent(v) || 'Password must contain lowercase letters',
                (v: string) => validateService.isNumberPresent(v) || 'Password must contain numbers',
                (v: string) => this.checkPassword() || 'Passwords has to match',
            ],
        },
        confirm_password: {
            value: '',
            rules: [
                (v: string) => !!v || 'Password is required',
                (v: string) => validateService.isValidLength(v) || '',
                (v: string) => this.checkPassword() || 'Passwords has to match',
            ],
        },
    };

    public validLength: boolean = false;
    public validUppercase: boolean = false;
    public validLowercase: boolean = false;
    public validNumber: boolean = false;
    public validMatch: boolean = false;

    public submit() {
        if (this.formValid) {
            this.resetPassword(this.form.new_password)
                .then((res: ResponseInterface) => {
                    if (res.success) {
                        this.alert = {
                            type: 'success',
                            display: true,
                            msg: 'Password has been reset successfully.',
                        };
                        this.resetForm();
                    } else {
                        this.alert = {
                            type: 'error',
                            display: true,
                            msg: 'Unable to reset your password at this time. Please try again later',
                        };
                    }
                })
                .catch(() => {
                    this.alert = {
                        type: 'error',
                        display: true,
                        msg: 'Unable to reset your password at this time. Please try again later',
                    };
                });
        }
    }

    /**
     * This gets values for the password checker
     */
    public validatePassword() {
        this.validLength = validateService.isValidLength(this.form.new_password.value);
        this.validUppercase = validateService.isUppercasePresent(this.form.new_password.value);
        this.validLowercase = validateService.isLowercasePresent(this.form.new_password.value);
        this.validNumber = validateService.isNumberPresent(this.form.new_password.value);
        this.validateAll();
    }

    /**
     * This gets values for the password checker
     */
    public validateConfirmPassword(): void {
        this.validMatch = this.checkPassword();
        this.validateAll();
    }

    private validateAll() {
        const refs: any = this.$refs.form;
        refs.validate();
    }

    private checkPassword(): boolean {
        return validateService.doesPasswordsMatch(this.form.confirm_password.value, this.form.new_password.value);
    }

    private checkPasswordMatchOldPassword(): boolean {
        return !validateService.doesPasswordsMatch(this.form.current_password.value, this.form.new_password.value);
    }

    private resetForm() {
        const refs: any = this.$refs.form;
        refs.reset();
    }
}
