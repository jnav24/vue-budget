import { Vue, Component } from 'vue-property-decorator';
import {AlertInterface} from '@/interfaces/alert.interface';
import {timestampService, validateService} from '@/module';
import {State} from 'vuex-class';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {UserLoginStateInterface} from '@/interfaces/user-login-state.interface';
import {UserInterface} from '@/interfaces/user.interface';

@Component
export default class Verify extends Vue {
    @State((state: RootStateInterface) => state.User.user) public userState: UserInterface;
    @State((state: RootStateInterface) => state.User.login) public loginState: UserLoginStateInterface;
    public alert: AlertInterface = {
        type: 'error',
        msg: '',
        display: false,
    };
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
        // @todo need token, and user_id
        console.log(this.$route.params.token);
        console.log(this.userState.user_id);
    }

    public submit() {
        if (this.formValid) {
            this.loading = true;
        }
    }
}
