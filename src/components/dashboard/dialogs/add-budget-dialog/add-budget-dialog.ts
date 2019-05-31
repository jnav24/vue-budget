import { Component } from 'vue-property-decorator';
import Dialogs from '@/components/dashboard/dialogs/dialogs';
import {FormInterface} from '@/interfaces/form.interface';
import {globalService, timestampService, validateService} from '@/module';
import {ResponseInterface} from '@/interfaces/response.interface';
import {Action, State} from 'vuex-class';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {BudgetTemplateStateInterface} from '@/interfaces/budget-template-state.interface';
import {BudgetStateInterface} from '@/interfaces/budget-state.interface';
import { cloneDeep } from 'lodash';
import {AlertInterface} from '@/interfaces/alert.interface';

Component.registerHooks([
    'mounted',
]);

@Component
class AddBudgetDialog extends Dialogs {
    @Action public getYearlyAggregations: () => Promise<ResponseInterface>;
    @Action public saveBudget: (obj: { name: string; expenses: any }) => Promise<ResponseInterface>;
    @State((state: RootStateInterface) => state.Budget) public budget: BudgetStateInterface;
    @State((state: RootStateInterface) => state.BudgetTemplates) public budgetTemplates: BudgetTemplateStateInterface;
    public addBudgetValid: boolean = false;
    public alert: AlertInterface = {
        type: 'error',
        display: false,
        msg: '',
    };
    public form: FormInterface = {
        name: {
            value: '',
            rules: [
                (v: any) => !!v || 'Budget name is required',
                (v: any) => validateService.isValidLength(v, 3) || 'Budget name must be at least 3 characters long',
            ],
        },
        month: {
            value: '',
            rules: [
                (v: any) => !!v || 'Month is required',
            ],
        },
        year: {
            value: '',
            rules: [
                (v: any) => !!v || 'Year is required',
            ],
        },
    };
    public months: any[] = globalService.getMonths();
    public years: any[] = globalService.getYears(1);

    public mounted() {
        this.form.month.value = this.nextCycle('M');

        if (this.form.month.value === 1) {
            this.form.year.value = this.nextCycle('Y');
        } else {
            this.form.year.value = Number(timestampService.getCurrentTimestamp('UTC', 'Y'));
        }
    }

    public get budgets() {
        return this.budget.budgetList;
    }

    public nextCycle(format: 'M' | 'Y') {
        let result: string = timestampService.getCurrentTimestamp('UTC');

        if (this.budgets.length) {
            const recent = this.budgets[0];

            if (typeof recent !== 'undefined') {
                result = recent.budget_cycle;
            }
        }

        if (format === 'M') {
            return Number(timestampService.format(timestampService.getMonth(1, result), 'M'));
        }

        return Number(timestampService.format(timestampService.getYear(1, result), 'Y'));
    }

    public addBudget() {
        if (this.addBudgetValid) {
            const data = {
                name: this.form.name.value,
                cycle: `${this.form.year.value}-${timestampService.setDoubleDigits(this.form.month.value)}-01 00:00:00`,
                expenses: this.resetIdForSaving(),
            };

            this.saveBudget(data)
                .then((res: ResponseInterface) => {
                    if (res.success) {
                        this.closeDialog();
                        const ref: any = this.$refs.addBudgetForm;
                        ref.reset();
                        this.$router.push({ name: 'budget-edit', params: { id: res.data.id } });
                        this.getYearlyAggregations();
                    } else {
                        this.alert.msg = res.msg;
                        this.alert.display = true;
                    }
                });
        }
    }

    private resetIdForSaving() {
        const data: any = cloneDeep(this.budgetTemplates.templates.expenses);

        for (const expense of Object.keys(data)) {
            data[expense].map((item: any, index: number) => {
                if (expense === 'banks') {
                    const id = item.id;
                    item.bank_template_id = id;
                }

                item.id = timestampService.generateTempId();
                return item;
            });
        }

        return data;
    }
}

export default AddBudgetDialog;
