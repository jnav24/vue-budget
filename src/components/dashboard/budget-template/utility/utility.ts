import {Vue, Component, Emit} from 'vue-property-decorator';
import {FormInterface} from '@/interfaces/form.interface';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {ResponseInterface} from '@/interfaces/response.interface';
import {Action} from 'vuex-class';
import {validateService} from '@/module';

@Component
class Utility extends Vue {
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

    private setData(): BudgetListAddInterface {
        return {
            type: 'utility',
            data: {
                name: this.form.name.value,
                amount: this.form.amount.value,
                type: this.form.type.value,
                due_date: this.form.due.value,
            },
        };
    }
}

export default Utility;
