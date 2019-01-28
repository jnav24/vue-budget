import { Vue, Component, Emit } from 'vue-property-decorator';
import {FormInterface} from '@/interfaces/form.interface';
import {globalService} from '@/module';
import {ResponseInterface} from '@/interfaces/response.interface';
import {Action, State} from 'vuex-class';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {UserStateInterface} from '@/interfaces/user-state.interface';

@Component
class CreditCard extends Vue {
    @Action public appendBudgetTemplate: (obj: BudgetListAddInterface) => Promise<ResponseInterface>;
    @State((state: RootStateInterface) => state.User) public user: UserStateInterface;
    public creditCardTypes = [
        {id: 1, name: 'Visa'},
    ];
    public dates = Array.from(Array(31).keys()).map((num: any) => num + 1);
    public form: FormInterface = {
        name: {
            value: '',
            rules: [],
        },
        type: {
            value: 0,
            rules: [],
        },
        limit: {
            value: 0,
            rules: [],
        },
        due: {
            value: 0,
            rules: [],
        },
        apr: {
            value: 0,
            rules: [],
        },
        last4: {
            value: 0,
            rules: [],
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

    public submit() {
        if (this.templateValid) {
            const data: BudgetListAddInterface = this.setData();
            this.appendBudgetTemplate(data)
                .then((res: ResponseInterface) => {
                    if (res.success) {
                        this.closeForm();
                    }
                });
        } else {
            this.closeForm();
        }
    }

    @Emit('submitForm')
    private closeForm() {
        // ...
    }

    private setData(): BudgetListAddInterface {
        return {
            type: 'creditCards',
            data: {
                user_id: this.user.user.id,
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
