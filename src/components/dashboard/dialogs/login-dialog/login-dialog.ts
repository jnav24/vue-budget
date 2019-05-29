import { Component } from 'vue-property-decorator';
import Dialogs from '@/components/dashboard/dialogs/dialogs';
import {FormInterface} from '@/interfaces/form.interface';
import {validateService} from '@/module';
import {Action, State} from 'vuex-class';
import {ResponseInterface} from '@/interfaces/response.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {UserStateInterface} from '@/interfaces/user-state.interface';

@Component
export default class LoginDialog extends Dialogs {
    @Action public logUserOut: () => Promise<{ success: boolean }>;
    @Action public logUserIn: (obj: {}) => Promise<ResponseInterface>;
    @State((state: RootStateInterface) => state.User) public userState: UserStateInterface;
    public form: FormInterface = {
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
            ],
        },
    };
    public loginDialogValid: boolean = false;

    public login() {
        this.logUserIn({
            username: this.userState.user.email,
            // password: this.form.password.value,
            password: 'password1',
        }).then((res: ResponseInterface) => {
            console.log('error?');
        });
    }

    public logout() {
        this.logUserOut()
            .then((res: { success: boolean }) => {
                if (res.success) {
                    this.$router.push({ name: 'login' });
                }
            });
    }
}
