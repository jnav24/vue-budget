import { Vue, Component} from 'vue-property-decorator';
import AddBudgetExpense from '@/components/dashboard/dialogs/add-budget-expense/AddBudgetExpense.vue';
import BudgetTemplate from '@/components/dashboard/budget-template/BudgetTemplate.vue';
import EmptyState from '@/components/dashboard/empty-state/EmptyState.vue';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {State} from 'vuex-class';
import {BudgetStateInterface} from '@/interfaces/budget-state.interface';
import {BillsStateInterface} from '@/interfaces/bills-state.interface';
import {BillTypesInterface} from '@/interfaces/bill-types.interface';
import {DataTableHeadersInterface} from '@/interfaces/data-table-headers.interface';

@Component({
    components: {
        AddBudgetExpense,
        BudgetTemplate,
        EmptyState,
    },
})
class Template extends Vue {
    @State((state: RootStateInterface) => state.Bills) public bills: BillsStateInterface;
    @State((state: RootStateInterface) => state.Budget) public budget: BudgetStateInterface;
    public expenseDialog: boolean = false;
    public expenseType: number = 0;
    public expenseData: any = {};
    public headers: any = {
        bank: [
            { text: 'Name', value: 'name' },
            { text: 'Amount', value: 'amount' },
            { text: 'Bank Type', value: 'type' },
        ],
        credit_card: [
            { text: 'Name', value: 'name' },
            { text: 'Card Type', value: 'type' },
            { text: 'Last 4 Digits', value: 'limit' },
            { text: 'Expiration Month', value: 'exp_month' },
            { text: 'Expiration Year', value: 'exp_year' },
            { text: 'APR', value: 'apr' },
            { text: 'Monthly Due Date', value: 'due_date' },
            { text: 'Credit Limit', value: 'limit' },
        ],
        job: [
            { text: 'Name', value: 'name' },
            { text: 'Amount', value: 'amount' },
            { text: 'Pay Frequency', value: 'pay_period' },
            { text: 'Initial Pay Date', value: 'initial_pay_date' },
        ],
        investment: [
            { text: 'Name', value: 'name' },
            { text: 'Amount', value: 'amount' },
            { text: 'Investment Type', value: 'type' },
        ],
        medical: [
            { text: 'Name', value: 'name' },
            { text: 'Amount', value: 'amount' },
            { text: 'Monthly Due Date', value: 'due_date' },
        ],
        miscellaneous: [
            { text: 'Name', value: 'name' },
            { text: 'Amount', value: 'amount' },
            { text: 'Monthly Due Date', value: 'due_date' },
        ],
        utility: [
            { text: 'Name', value: 'name' },
            { text: 'Amount', value: 'amount' },
            { text: 'Utility Type', value: 'type' },
            { text: 'Monthly Due Date', value: 'due_date' },
        ],
    };

    public getTemplateHeaders(name: string): DataTableHeadersInterface[] {
        return this.headers[name] || [];
    }

    public getTemplateList(name: string) {
        return (this.budget.budgetTemplate as any)[name];
    }

    public getTemplateName(name: string): string {
        const index = this.bills.types.findIndex((obj: BillTypesInterface) => obj.slug === name);
        return this.bills.types[index].name || 'No Name Given';
    }

    public openEditBudgetDialog(obj: { type: number; data: any }) {
        this.expenseDialog = true;
        this.expenseType = obj.type;
        this.expenseData = obj.data;
    }

    public closeEditBudgetDialog(bool: boolean) {
        if (!bool) {
            this.expenseDialog = bool;
            this.expenseType = 0;
            this.expenseData = {};
        }
    }
}

export default Template;
