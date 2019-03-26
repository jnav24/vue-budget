import { Vue, Component } from 'vue-property-decorator';
import {State} from 'vuex-class';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {UserStateInterface} from '@/interfaces/user-state.interface';
import {FormInterface} from '@/interfaces/form.interface';

Component.registerHooks([
    'mounted',
]);

@Component
export default class UserProfile extends Vue {
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
    };

    public get user() {
        return this.userState.user;
    }

    public mounted() {
        this.form.first_name.value = this.user.first_name;
        this.form.last_name.value = this.user.last_name;
        this.form.email.value = this.user.email;
    }
}
