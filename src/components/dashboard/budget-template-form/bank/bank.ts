import {Vue, Component, Emit, Prop} from 'vue-property-decorator';
import {FormInterface} from '@/interfaces/form.interface';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {ResponseInterface} from '@/interfaces/response.interface';
import {Action} from 'vuex-class';
import {timestampService, validateService} from '@/module';

Component.registerHooks([
    'mounted',
]);

@Component
class Bank extends Vue {
    @Prop() public data: any;
    @Prop() public dialog: any;
    @Action public appendBudgetTemplate: (obj: BudgetListAddInterface) => Promise<ResponseInterface>;
    public form: FormInterface = {
        name: {
            value: '',
            rules: [
                (v: any) => !!v || 'Name is required',
                (v: any) => validateService.isValidLength(v, 3) || 'Name is not long enough',
            ],
        },
        type: {
            value: '',
            rules: [
                (v: any) => !!v || 'Name is required',
            ],
        },
        amount: {
            value: 0,
            rules: [
                (v: any) => {
                    if (!!v) {
                        return validateService.isNumeric(v) || 'Amount has to be numeric';
                    }

                    return true;
                },
            ],
        },
    };
    public templateValid: boolean = false;
    public types = [
        { value: 'checking', label: 'Checking' },
        { value: 'savings', label: 'Savings' },
    ];

    public mounted() {
        if (this.dialog) {
            this.setupForm();
        }
    }

    public submit() {
        if (this.templateValid) {
            const data: BudgetListAddInterface = this.setData();
            this.appendBudgetTemplate(data)
                .then((res: ResponseInterface) => {
                    if (res.success) {
                        this.closeForm();
                        this.resetForm();
                    }
                });
        } else {
            this.closeForm();
            this.resetForm();
        }
    }

    @Emit('submitForm')
    private closeForm() {
        // ...
    }

    private resetForm() {
        const ref: any = this.$refs.templateForm;
        ref.reset();
    }

    private setupForm() {
        this.form.name.value = this.data.name;
        this.form.amount.value = this.data.amount;
        this.form.type.value = this.data.type;
    }

    private setData(): BudgetListAddInterface {
        return {
            type: 'bank',
            data: {
                id: 'temp_' + timestampService.generateUnixId(),
                name: this.form.name.value,
                amount: this.form.amount.value,
                type: this.form.type.value,
            },
        };
    }
}

export default Bank;
