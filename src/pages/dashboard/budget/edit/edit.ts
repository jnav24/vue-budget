import { Vue, Component } from 'vue-property-decorator';
import {ResponseInterface} from '@/interfaces/response.interface';
import {Action, State} from 'vuex-class';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {BudgetStateInterface} from '@/interfaces/budget-state.interface';
import Banks from '@/components/dashboard/budgets/banks/Banks.vue';
import CreditCards from '@/components/dashboard/budgets/credit-cards/CreditCards.vue';
import Investments from '@/components/dashboard/budgets/investments/Investments.vue';
import Jobs from '@/components/dashboard/budgets/jobs/Jobs.vue';
import Medical from '@/components/dashboard/budgets/medical/Medical.vue';
import Miscellaneous from '@/components/dashboard/budgets/miscellaneous/Miscellaneous.vue';
import Utilities from '@/components/dashboard/budgets/utilities/Utilities.vue';
import {currencyService, globalService, timestampService} from '@/module';
import AddBudgetExpense from '@/components/dashboard/dialogs/add-budget-expense/AddBudgetExpense.vue';
import SaveControls from '@/components/dashboard/save-controls/SaveControls.vue';
import {BudgetListInterface} from '@/interfaces/budget-list.interface';
import ConfirmDialog from '@/components/dashboard/dialogs/confirm-dialog/ConfirmDialog.vue';
import {SaveControlsInterface} from '@/interfaces/save-controls.interface';

Component.registerHooks([
    'created',
]);

@Component({
    components: {
        AddBudgetExpense,
        Banks,
        ConfirmDialog,
        CreditCards,
        Investments,
        Jobs,
        Medical,
        Miscellaneous,
        SaveControls,
        Utilities,
    },
})
class Edit extends Vue {
    @Action public getSingleBudget: (id: number) => Promise<ResponseInterface>;
    @Action public updateBudget: (obj: BudgetListInterface) => Promise<ResponseInterface>;
    @State((state: RootStateInterface) => state.Budget) public budgetState: BudgetStateInterface;
    public activeTab: number = 0;
    public budget: any = {};
    public canSaveBudget: boolean = false;
    public confirmCancelDialog = false;
    public confirmCancelData = {
        button: {
            color: 'danger',
            text: 'Exit without saving',
        },
        text: 'If you proceed, you will lose your unsaved changes. Would you like to save your changes?',
    };
    public expenseDialog: boolean = false;
    public expenseType: number = 0;
    public expenseData: any = {};
    public showPaidForm: boolean = true;
    public totalEarned: number = 0;
    public totalSavings: number = 0;
    public totalSpent: number = 0;

    public get isLoading() {
        return !Object.keys(this.budget).length;
    }

    public getComponentName(val: string): string {
        return globalService.ucFirst(globalService.camelCase(val));
    }

    public formatCycle(date: string): string {
        return timestampService.format(date, 'MMM YYYY');
    }

    public formatDollar(dollar: number | string): string {
        return currencyService.setCurrency(dollar.toString());
    }

    public setTabName(value: string): string {
        return value.replace('_', ' ');
    }

    public submit() {
        // @todo if timestamp unix is >= now unix timestamp, then update the templates
    }

    public saveControls(obj: SaveControlsInterface) {
        if (obj.save) {
            this.updateBudget(this.budget)
                .then((res: ResponseInterface) => {
                    console.log(res);
                    if (res.success) {
                        console.log('updated budget');
                    }
                });
        } else {
            if (this.canSaveBudget) {
                this.confirmCancelDialog = true;
            } else {
                this.$router.push({ name: 'budget-list' });
            }
        }
    }

    public closeEditBudgetDialog(bool: boolean) {
        if (!bool) {
            this.expenseDialog = bool;
            this.expenseType = 0;
            this.expenseData = {};
        }
    }

    public openEditBudgetDialog(obj: { type: number; data: any }) {
        this.expenseDialog = true;
        this.expenseType = obj.type;
        this.expenseData = obj.data;
    }

    public saveLocalBudgetState(data: { valid: boolean; data: any; update: boolean }) {
        if (data.valid && data.data.type !== 'blank') {
            if (data.update) {
                const index = (this.budget.expenses as any)[data.data.type]
                    .findIndex((obj: any) => obj.id === data.data.data.id);
                Vue.set((this.budget.expenses as any)[data.data.type], index, data.data.data);
            } else {
                (this.budget.expenses as any)[data.data.type] = [
                    ...(this.budget.expenses as any)[data.data.type],
                    data.data.data,
                ];
            }

            this.canSaveBudget = true;
            this.getAllTotals();
        }
    }

    public emitConfirmCancelData(bool: any) {
        if (bool) {
            this.$router.push({ name: 'budget-list' });
        }
    }

    public emitConfirmCancelDialog(bool: boolean) {
        this.confirmCancelDialog = bool;
    }

    private created() {
        const index = this.budgetState.budgetList.findIndex((obj: any) => obj.id === this.$route.params.id);

        if (
            typeof this.budgetState.budgetList[index] === 'undefined' ||
            typeof this.budgetState.budgetList[index].expenses === 'undefined'
        ) {
            this.getSingleBudget(Number(this.$route.params.id))
                .then((res: ResponseInterface) => {
                    if (res.success) {
                        this.budget = res.data;
                        this.getAllTotals();
                    }
                });
        } else {
            this.budget = this.budgetState.budgetList[index];
            this.getAllTotals();
        }
    }

    private getAllTotals() {
        this.getTotalEarned();
        this.getTotalSpent();
        this.getTotalSavings();
    }

    private getTotalEarned() {
        const earned = ['jobs'];
        this.totalEarned = 0;
        this.totalEarned = this.getTotals(earned);
    }

    private getTotalSpent() {
        const spending = ['credit_cards', 'medical', 'miscellaneous', 'utilities'];
        this.totalSpent = 0;
        this.totalSpent = this.getTotals(spending);
    }

    private getTotalSavings() {
        this.totalSavings = ((this as any).totalEarned - (this as any).totalSpent);
    }

    private getTotals(items: any): number {
        let total = 0;

        for (const item of items) {
            if (typeof this.budget.expenses[item] !== 'undefined') {
                for (const budget of this.budget.expenses[item]) {
                    total = total + Number(budget.amount);
                }
            }
        }

        return total;
    }
}

export default Edit;
