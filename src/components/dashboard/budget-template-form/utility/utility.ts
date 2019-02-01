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
class Utility extends Vue {
    @Prop() public data: any;
    @Prop() public dialog: any;
    @Action public appendBudgetTemplate: (obj: BudgetListAddInterface) => Promise<ResponseInterface>;
    public dates = Array.from(Array(31).keys()).map((num: any) => num + 1);
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
        due: {
            value: 0,
            rules: [
                (v: any) => !!v || 'Due date is required',
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
        { value: 'electric', label: 'Electric' },
        { value: 'gas', label: 'Gas' },
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

    private setupForm() {
        this.form.name.value = this.data.name;
        this.form.amount.value = this.data.amount;
        this.form.due.value = this.data.due_date;
        this.form.type.value = this.data.type;
    }

    private resetForm() {
        const ref: any = this.$refs.templateForm;
        ref.reset();
    }

    private setData(): BudgetListAddInterface {
        return {
            type: 'utility',
            data: {
                id: 'temp_' + timestampService.generateUnixId(),
                name: this.form.name.value,
                amount: this.form.amount.value,
                type: this.form.type.value,
                due_date: this.form.due.value,
            },
        };
    }
}

export default Utility;
