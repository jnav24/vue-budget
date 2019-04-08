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
import Vehicles from '@/components/dashboard/budgets/vehicles/Vehicles.vue';
import {globalService, timestampService} from '@/module';
import AddBudgetExpense from '@/components/dashboard/dialogs/add-budget-expense/AddBudgetExpense.vue';
import SaveControls from '@/components/dashboard/save-controls/SaveControls.vue';
import {BudgetListInterface} from '@/interfaces/budget-list.interface';
import ConfirmDialog from '@/components/dashboard/dialogs/confirm-dialog/ConfirmDialog.vue';
import {SaveControlsInterface} from '@/interfaces/save-controls.interface';
import {AlertInterface} from '@/interfaces/alert.interface';
import {BudgetTemplateInterface} from '@/interfaces/budget-template.interface';
import {BudgetTemplateStateInterface} from '@/interfaces/budget-template-state.interface';
import Totals from '@/components/dashboard/totals/Totals.vue';

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
        Totals,
        Utilities,
        Vehicles,
    },
})
class Edit extends Vue {
    @Action public getSingleBudget: (id: number) => Promise<ResponseInterface>;
    @Action public saveBudgetTemplate: (budget: BudgetTemplateInterface) => Promise<ResponseInterface>;
    @Action public updateBudget: (obj: BudgetListInterface) => Promise<ResponseInterface>;
    @Action public getAllBudgetTemplates: () => Promise<ResponseInterface>;
    @Action public getUnpaidBillTotals: () => Promise<ResponseInterface>;
    @Action public getSelectedYearAggregate: (obj: { year: string }) => Promise<ResponseInterface>;
    @State((state: RootStateInterface) => state.Budget) public budgetState: BudgetStateInterface;
    @State((state: RootStateInterface) => state.BudgetTemplates)
    public budgetTemplateState: BudgetTemplateStateInterface;
    public activeTab: number = 0;
    public alert: AlertInterface = {
        display: false,
        msg: '',
        type: 'error',
    };
    public budget: BudgetListInterface = {} as BudgetListInterface;
    public canSaveBudget: boolean = false;
    public confirmCancelDialog = false;
    public confirmMessage: string = `
        If you proceed, you will lose your unsaved changes. Would you like to save your changes?
    `;
    public confirmSubmitText: string = 'Exit without saving';
    public expenseCycle: string = timestampService.getCurrentTimestamp('UTC', 'YYYY-MM-DD');
    public expenseDialog: boolean = false;
    public expenseType: number = 0;
    public expenseData: any = {};
    public showPaidForm: boolean = true;
    public totalInBanks: number = 0;
    public totalEarned: number = 0;
    public totalInvestments: number = 0;
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

    public setTabName(value: string): string {
        return value.replace('_', ' ');
    }

    public saveControls(obj: SaveControlsInterface) {
        if (obj.save) {
            this.updateBudget(this.budget)
                .then((res: ResponseInterface) => {
                    if (res.success) {
                        this.updateLocalState();
                        this.alert.msg = 'Budget has been updated successfully.';
                        this.alert.type = 'success';
                        this.alert.display = true;
                        this.canSaveBudget = false;

                        if (this.setLatestBudget()) {
                            this.updateBudgetTemplate();
                            this.getUnpaidBillTotals();
                        }

                        this.getSelectedYearAggregate({
                            year: timestampService.format(this.budget.budget_cycle, 'YYYY'),
                        });

                        if (obj.exit) {
                            this.$router.push({ name: 'budget-list' });
                        }

                        setTimeout(() => {
                            this.alert.display = false;
                        }, 5000);
                    } else {
                        this.alert.msg = 'There was an error saving the budget. Please try again later.';
                        this.alert.type = 'error';
                        this.alert.display = true;
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
            this.expenseCycle = timestampService.getCurrentTimestamp('UTC', 'YYYY-MM-DD');
            this.expenseDialog = bool;
            this.expenseType = 0;
            this.expenseData = {};
        }
    }

    public openEditBudgetDialog(obj: { type: number; data: any }) {
        this.expenseCycle = this.budget.budget_cycle;
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
                if (typeof (this.budget.expenses as any)[data.data.type] !== 'undefined') {
                    (this.budget.expenses as any)[data.data.type] = [
                        ...(this.budget.expenses as any)[data.data.type],
                        data.data.data,
                    ];
                } else {
                    (this.budget.expenses as any)[data.data.type] = [
                        data.data.data,
                    ];
                }
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
        this.getTotalInBanks();
        this.getTotalEarned();
        this.getTotalInvestments();
        this.getTotalSpent();
        this.getTotalSavings();
    }

    private getTotalInBanks() {
        const earned = ['banks'];
        this.totalInBanks = 0;
        this.totalInBanks = this.getTotals(earned);
    }

    private getTotalEarned() {
        const earned = ['jobs'];
        this.totalEarned = 0;
        this.totalEarned = this.getTotals(earned);
    }

    private getTotalInvestments() {
        const earned = ['investments'];
        this.totalInvestments = 0;
        this.totalInvestments = this.getTotals(earned);
    }

    private getTotalSpent() {
        const spending = ['credit_cards', 'medical', 'miscellaneous', 'utilities', 'vehicles'];
        this.totalSpent = 0;
        this.totalSpent = this.getTotals(spending);
    }

    private getTotalSavings() {
        this.totalSavings = ((this as any).totalEarned - (this as any).totalSpent);
    }

    private getTotals(items: any[]): number {
        let total = 0;

        for (const item of items) {
            if (typeof this.budget.expenses[item] !== 'undefined') {
                for (const budget of this.budget.expenses[item]) {
                    if (item === 'miscellaneous' && !!budget.not_track_amount) {
                        continue;
                    }

                    total = total + Number(budget.amount);
                }
            }
        }

        return total;
    }

    private setLatestBudget(): boolean {
        const index = this.budgetState.budgetList.findIndex((budget: any) => budget.id === this.budget.id);
        const startOfMonth = timestampService.getStartDayOfMonth();
        return index === 0 && timestampService.unix(this.budget.budget_cycle) >= timestampService.unix(startOfMonth);
    }

    private updateBudgetTemplate() {
        const data: BudgetTemplateInterface = {
            expenses: {
                banks: [],
                credit_cards: [],
                investments: [],
                jobs: [],
                medical: [],
                miscellaneous: [],
                utilities: [],
                vehicles: [],
            },
        };

        this.budget.expenses.banks.map((budget: any) => {
            const index = this.budgetTemplateState.templates.expenses.banks.findIndex((obj: any) => {
                return obj.id === budget.bank_template_id;
            });

            if (index > -1) {
                const temp = Object.assign(
                    {},
                    this.budgetTemplateState.templates.expenses.banks[index],
                    { amount: budget.amount },
                );
                data.expenses.banks.push(temp);
            }
        });

        if (data.expenses.banks.length) {
            this.saveBudgetTemplate(data)
                .then((res: ResponseInterface) => {
                    this.getAllBudgetTemplates();
                });
        }
    }

    private updateLocalState() {
        const index = this.budgetState.budgetList.findIndex((obj: any) => {
            return Number(obj.id) === Number(this.$route.params.id);
        });

        this.budget = this.budgetState.budgetList[index];
    }
}

export default Edit;
