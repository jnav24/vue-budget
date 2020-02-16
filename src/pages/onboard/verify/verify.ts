import { Vue, Component } from 'vue-property-decorator';
import {AlertInterface} from '@/interfaces/alert.interface';
import {timestampService, userService, validateService} from '@/module';
import {State} from 'vuex-class';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {UserLoginStateInterface} from '@/interfaces/user-login-state.interface';
import {UserInterface} from '@/interfaces/user.interface';
import {ResponseInterface} from '@/interfaces/response.interface';

@Component
export default class Verify extends Vue {
    @State((state: RootStateInterface) => state.User.user) public userState: UserInterface;
    @State((state: RootStateInterface) => state.User.login) public loginState: UserLoginStateInterface;
    public alert: AlertInterface = {
        type: 'error',
        msg: '',
        display: false,
    };
    public emailSent = false;
    public isExpired = false;
    public formValid = false;
    public form: any = {
        verify: {
            value: '',
            rules: [
                (v: string) => !!v || 'Verification is required',
                (v: string) => validateService.isValidLength(v, 6) || 'Verification code is at least 6 characters long',
            ],
        },
    };
    public loading = false;

    public created() {
        this.isExpired = timestampService.unix(timestampService.getCurrentTimestamp()) >
            timestampService.unix(this.loginState.verify.expires_at);
    }

    public resendEmail() {
        this.loading = true;

        userService.resendVerifyToken(this.$route.params.token, this.userState.user_id ?? '')
            .then((res: ResponseInterface) => {
                this.loading = false;

                if (res.success) {
                    this.emailSent = true;
                    this.alert.type = 'success';
                    this.alert.msg = 'Email sent! If email is not in your inbox, check your spam folder.';
                    this.alert.display = true;
                    return true;
                }

                this.alert.msg = res.msg;
                this.alert.display = true;
            })
            .catch((error) => {
                this.loading = false;
                this.alert.msg = 'Unable to resend email at this time';
                this.alert.display = true;
            });
    }

    public submit() {
        if (this.formValid) {
            this.loading = true;

            userService.submitVerifyToken(
                this.$route.params.token,
                this.userState.user_id ?? '',
                this.form.verify.value,
            )
                .then((res: ResponseInterface) => {
                    if (res.success) {
                        this.$router.push({ name: 'dashboard' });
                        return true;
                    }

                    if (res.msg.includes('expired')) {
                        this.isExpired = true;
                    }

                    this.loading = false;
                    this.alert.msg = res.msg;
                    this.alert.display = true;
                })
                .catch((error) => {
                    const err = error.response;
                    let message = 'Unable to submit verification at this time';

                    if (!!err.data && !!err.data) {
                        message = err.data.message;
                    }

                    this.loading = false;
                    this.alert.msg = message;
                    this.alert.display = true;
                });
        }
    }
}
