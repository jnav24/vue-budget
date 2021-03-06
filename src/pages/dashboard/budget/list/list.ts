import { Vue, Component } from 'vue-property-decorator';
import {Action, Getter, State} from 'vuex-class';
import {DataTableInterface} from '@/interfaces/data-table.interface';
import AddBudgetDialog from '@/components/dashboard/dialogs/add-budget-dialog/AddBudgetDialog.vue';
import ConfirmDialog from '@/components/dashboard/dialogs/confirm-dialog/ConfirmDialog.vue';
import EmptyState from '@/components/dashboard/empty-state/EmptyState.vue';
import {ResponseInterface} from '@/interfaces/response.interface';
import {budgetService, timestampService} from '@/module';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {BudgetStateInterface} from '@/store/modules/budget/budget-state.interface';
import {BudgetTemplateStateInterface} from '@/store/modules/budget-template/budget-template-state.interface';
import AlertDialog from '@/components/dashboard/dialogs/alert-dialog/AlertDialog.vue';
import { groupBy } from 'lodash';
import {BudgetListInterface} from '@/interfaces/budget-list.interface';

@Component({
    components: {
        AddBudgetDialog,
        AlertDialog,
        ConfirmDialog,
        EmptyState,
    },
})
class List extends Vue {
    @Action public getYearlyAggregations: () => Promise<ResponseInterface>;
    @Action public deleteSingleBudget: (num: number) => Promise<ResponseInterface>;
    @Getter public allYears: Array<{ label: string; value: number }>;
    @State((state: RootStateInterface) => state.Budget) public budget: BudgetStateInterface;
    @State((state: RootStateInterface) => state.BudgetTemplates) public budgetTemplates: BudgetTemplateStateInterface;
    public addBudgetDialog: boolean = false;
    public alertData: any = {
        text: '',
        type: '',
    };
    public alertDialog: boolean = false;
    public confirmDialog: boolean = false;
    public confirmMessage: string = 'Are you sure you want to delete this budget?';
    public search: string = '';
    public selectedYear: number = Number(timestampService.getCurrentTimestamp('UTC', 'Y'));
    public tableHeaders: any = [
        { text: 'Name', value: 'name', sortable: false, class: ['text-xs-center'] },
        { text: 'Date', value: 'created_at', sortable: false, class: ['text-xs-center'] },
        { text: 'Actions', value: '', sortable: false, class: ['text-xs-center'] },
    ];
    public tableInfo: DataTableInterface = {
        rowsPerPageItems: [24, 48, 60],
    };
    private delete: number = 0;

    public get expenses() {
        return this.budgetTemplates.templates.expenses;
    }

    public get tableItems() {
        return groupBy(this.budget.budgetList, (obj: BudgetListInterface) => {
            return timestampService.format(obj.budget_cycle, 'YYYY');
        });
    }

    public get years() {
        return this.allYears;
    }

    public deleteBudget(id: number) {
        this.confirmDialog = true;
        this.delete = id;
    }

    public emitAddBudgetDialog(dialog: boolean) {
        this.addBudgetDialog = dialog;
    }

    public emitConfirmDialog(dialog: boolean) {
        this.confirmDialog = dialog;

        if (!dialog) {
            this.delete = 0;
        }
    }

    public emitConfirmData(num: number) {
        if (!!num) {
            this.removeBudget();
        }
    }

    public formatBudget(date: string): string {
        return timestampService.format(date, 'MMM YYYY');
    }

    public canAddBudget(): boolean {
        return !Object.keys(this.budgetTemplates.templates).length || budgetService.isExpenseListEmpty(this.expenses);
    }

    public goToBudgetTemplate() {
        this.$router.push({ name: 'budget-template' });
    }

    public emitAlertDialog(bool: boolean) {
        this.alertDialog = bool;
    }

    private removeBudget() {
        if (this.delete) {
            this.deleteSingleBudget(this.delete)
                .then((res: ResponseInterface) => {
                    if (res.success) {
                        this.alertData.text = 'Budget was removed successfully';
                        this.alertData.type = 'success';
                        this.getYearlyAggregations();
                    } else {
                        this.alertData.text = 'Budget couldn\'t be removed at this time. Please try again later.';
                        this.alertData.type = 'danger';
                    }

                    this.alertDialog = true;
                });
        }
    }
}

export default List;
