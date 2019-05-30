import { Component } from 'vue-property-decorator';
import Dialogs from '@/components/dashboard/dialogs/dialogs';
import {FormInterface} from '@/interfaces/form.interface';
import {validateService} from '@/module';
import {Action, State} from 'vuex-class';
import {ResponseInterface} from '@/interfaces/response.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {UserStateInterface} from '@/interfaces/user-state.interface';
import {AlertInterface} from '@/interfaces/alert.interface';

@Component
export default class LoginDialog extends Dialogs {
    @Action public logUserOut: () => Promise<{ success: boolean }>;
    @Action public logUserIn: (obj: {}) => Promise<ResponseInterface>;
    @State((state: RootStateInterface) => state.User) public userState: UserStateInterface;
    public alert: AlertInterface = {
        type: 'error',
        display: false,
        msg: '',
    };
    public form: FormInterface = {
        password: {
            value: '',
            rules: [
                (v: any) => !!v || 'Password is required',
                (v: any) => validateService.isValidLength(v) || 'Password is not long enough',
            ],
        },
    };
    public loginDialogValid: boolean = false;

    public login() {
        this.logUserIn({
            username: this.userState.user.email,
            password: this.form.password.value,
        }).then((res: ResponseInterface) => {
            if (!res.success) {
                this.alert.msg = res.msg;
                this.alert.display = true;
            }
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
