import { Vue, Component, Emit } from 'vue-property-decorator';
import {FormInterface} from '@/interfaces/form.interface';
import {globalService, timestampService, validateService} from '@/module';
import {ResponseInterface} from '@/interfaces/response.interface';
import {Action} from 'vuex-class';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';

@Component
class CreditCard extends Vue {
    @Action public appendBudgetTemplate: (obj: BudgetListAddInterface) => Promise<ResponseInterface>;
    public creditCardTypes = [
        {id: 1, name: 'Visa'},
    ];
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
            value: 0,
            rules: [
                (v: any) => !!v || 'Credit card type is required',
            ],
        },
        limit: {
            value: '',
            rules: [
                (v: any) => !!v || 'Credit limit is required',
                (v: any) => validateService.isNumeric(v) || 'Credit limit must be numeric',
                (v: any) => validateService.isValidLength(v, 4) || 'Credit limit not valid',
            ],
        },
        due: {
            value: 0,
            rules: [
                (v: any) => !!v || 'Due date is required',
            ],
        },
        apr: {
            value: '',
            rules: [
                (v: any) => {
                    if (!!v) {
                        return validateService.isNumeric(v) || 'APR must be numeric';
                    }

                    return true;
                },
                (v: any) => {
                    if (!!v) {
                        return validateService.isValidLength(v, 2) || 'APR must be at least two characters';
                    }

                    return true;
                },
            ],
        },
        last4: {
            value: '',
            rules: [
                (v: any) => {
                    if (!!v) {
                        return validateService.isNumeric(v) || 'Last 4 digits of your credit card must be numeric';
                    }

                    return true;
                },
                (v: any) => {
                    if (!!v) {
                        return validateService.isValidLength(v, 4) || 'Must be at least 4 characters';
                    }

                    return true;
                },
            ],
        },
        expMonth: {
            value: 0,
            rules: [],
        },
        expYear: {
            value: 0,
            rules: [],
        },
    };
    public months: any[] = globalService.getMonths();
    public years: any[] = globalService.getYears();
    public templateValid: boolean = false;

    public setMonth() {
        if (!this.form.expMonth.value) {
            this.form.expMonth.value = timestampService.getCurrentTimestamp('UTC', 'MM');
        }
    }

    public setYear() {
        if (!this.form.expYear.value) {
            this.form.expYear.value = timestampService.getCurrentTimestamp('UTC', 'YYYY');
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

    private setData(): BudgetListAddInterface {
        return {
            type: 'credit_card',
            data: {
                id: 'temp_' + timestampService.generateUnixId(),
                name: this.form.name.value,
                due_date: this.form.due.value,
                limit: this.form.limit.value,
                type: this.form.type.value,
                apr: this.form.apr.value,
                last_4: this.form.last4.value,
                exp_month: this.form.expMonth.value,
                exp_year: this.form.expYear.value,
            },
        };
    }
}

export default CreditCard;
