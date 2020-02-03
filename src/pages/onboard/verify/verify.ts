import { Vue, Component } from 'vue-property-decorator';
import {AlertInterface} from '@/interfaces/alert.interface';
import {validateService} from '@/module';

@Component
export default class Verify extends Vue {
    public alert: AlertInterface = {
        type: 'error',
        msg: '',
        display: false,
    };
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

    public submit() {
        if (this.formValid) {
            this.loading = true;
        }
    }
}
