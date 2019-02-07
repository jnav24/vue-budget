import { Vue, Component} from 'vue-property-decorator';
import AddBudgetExpense from '@/components/dashboard/dialogs/add-budget-expense/AddBudgetExpense.vue';
import BudgetTemplate from '@/components/dashboard/budget-template/BudgetTemplate.vue';
import EmptyState from '@/components/dashboard/empty-state/EmptyState.vue';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {Action, State} from 'vuex-class';
import {BudgetStateInterface} from '@/interfaces/budget-state.interface';
import {BillTypesInterface} from '@/interfaces/bill-types.interface';
import {DataTableHeadersInterface} from '@/interfaces/data-table-headers.interface';
import {TypesStateInterface} from '@/interfaces/types-state.interface';
import {ResponseInterface} from '@/interfaces/response.interface';
import {BudgetTemplateInterface} from '@/interfaces/budget-template.interface';
import AlertDialog from '@/components/dashboard/dialogs/alert-dialog/AlertDialog.vue';
import {BudgetTemplateStateInterface} from '@/interfaces/budget-template-state.interface';
import {budgetService} from '@/module';

@Component({
    components: {
        AddBudgetExpense,
        AlertDialog,
        BudgetTemplate,
        EmptyState,
    },
})
class Template extends Vue {
    @Action public saveBudgetTemplate: (obj: BudgetTemplateInterface) => Promise<ResponseInterface>;
    @State((state: RootStateInterface) => state.Types) public types: TypesStateInterface;
    @State((state: RootStateInterface) => state.Budget) public budget: BudgetStateInterface;
    @State((state: RootStateInterface) => state.BudgetTemplates) public budgetTemplates: BudgetTemplateStateInterface;
    public alertData: any = {
        text: '',
        type: '',
    };
    public alertDialog: boolean = false;
    public expenseDialog: boolean = false;
    public expenseType: number = 0;
    public expenseData: any = {};
    public headers: any = {
        banks: [
            { text: 'Name', value: 'name' },
            { text: 'Amount', value: 'amount' },
            { text: 'Bank Type', value: 'bank_type_id' },
        ],
        credit_cards: [
            { text: 'Name', value: 'name' },
            { text: 'Card Type', value: 'credit_card_type_id' },
            { text: 'Last 4 Digits', value: 'last_4' },
            { text: 'Expiration Month', value: 'exp_month' },
            { text: 'Expiration Year', value: 'exp_year' },
            { text: 'APR', value: 'apr' },
            { text: 'Monthly Due Date', value: 'due_date' },
            { text: 'Credit Limit', value: 'limit' },
        ],
        jobs: [
            { text: 'Name', value: 'name' },
            { text: 'Amount', value: 'amount' },
            { text: 'Pay Frequency', value: 'job_type_id' },
            { text: 'Initial Pay Date', value: 'initial_pay_date' },
        ],
        investments: [
            { text: 'Name', value: 'name' },
            { text: 'Amount', value: 'amount' },
            { text: 'Investment Type', value: 'investment_type_id' },
        ],
        medical: [
            { text: 'Name', value: 'name' },
            { text: 'Amount', value: 'amount' },
            { text: 'Type', value: 'medical_type_id' },
            { text: 'Monthly Due Date', value: 'due_date' },
        ],
        miscellaneous: [
            { text: 'Name', value: 'name' },
            { text: 'Amount', value: 'amount' },
            { text: 'Monthly Due Date', value: 'due_date' },
        ],
        utilities: [
            { text: 'Name', value: 'name' },
            { text: 'Amount', value: 'amount' },
            { text: 'Utility Type', value: 'utility_type_id' },
            { text: 'Monthly Due Date', value: 'due_date' },
        ],
    };

    public get canSaveTemplates() {
        return this.budgetTemplates.canSave;
    }

    public get expenses() {
        return this.budgetTemplates.templates.expenses;
    }

    public get bills() {
        return this.types.bills;
    }

    public getTemplateHeaders(name: string): DataTableHeadersInterface[] {
        return this.headers[name] || [];
    }

    public getTemplateList(name: string) {
        return (this.expenses as any)[name];
    }

    public getTemplateName(name: string): string {
        const index = this.bills.findIndex((obj: BillTypesInterface) => obj.slug === name);

        if (index === -1) {
            return 'No Name Given';
        }

        return this.bills[index].name;
    }

    public emitAlertDialog(dialog: boolean) {
        this.alertDialog = dialog;
    }

    public openEditBudgetDialog(obj: { type: number; data: any }) {
        this.expenseDialog = true;
        this.expenseType = obj.type;
        this.expenseData = obj.data;
    }

    public openAlertDialog(obj: any) {
        this.alertData = obj;
        this.alertDialog = true;
    }

    public closeEditBudgetDialog(bool: boolean) {
        if (!bool) {
            this.expenseDialog = bool;
            this.expenseType = 0;
            this.expenseData = {};
        }
    }

    public saveTemplate() {
        this.saveBudgetTemplate(this.budgetTemplates.templates)
            .then((res: ResponseInterface) => {
                if (res.success) {
                    this.alertData.text = 'Budget has been saved successfully!';
                    this.alertData.type = 'success';
                } else {
                    this.alertData.text = 'Budget couldn\'t be saved at this time. Please try again later.';
                    this.alertData.type = 'danger';
                }

                this.alertDialog = true;
            });
    }

    public isTemplateEmpty(): boolean {
        return budgetService.isExpenseListEmpty(this.expenses);
    }
}

export default Template;
