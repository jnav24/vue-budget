import { Vue, Component } from 'vue-property-decorator';
import {Action, State} from 'vuex-class';
import {DataTableInterface} from '@/interfaces/data-table.interface';
import AddBudgetDialog from '@/components/dashboard/dialogs/add-budget-dialog/AddBudgetDialog.vue';
import ConfirmDialog from '@/components/dashboard/dialogs/confirm-dialog/ConfirmDialog.vue';
import EmptyState from '@/components/dashboard/empty-state/EmptyState.vue';
import {ResponseInterface} from '@/interfaces/response.interface';
import {timestampService} from '@/module';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {BudgetStateInterface} from '@/interfaces/budget-state.interface';

@Component({
    components: {
        AddBudgetDialog,
        ConfirmDialog,
        EmptyState,
    },
})
class List extends Vue {
    @Action public deleteSingleBudget: (num: number) => Promise<ResponseInterface>;
    @State((state: RootStateInterface) => state.Budget) public budget: BudgetStateInterface;
    public addBudgetDialog: boolean = false;
    public confirmData: any = {
        text: 'Are you sure you want to delete this budget?',
    };
    public confirmDialog: boolean = false;
    public search: string = '';
    public tableHeaders: any = [
        { text: 'Name', value: 'name', sortable: false, class: ['text-xs-center'] },
        { text: 'Date', value: 'created_at', sortable: false, class: ['text-xs-center'] },
        { text: 'Actions', value: '', sortable: false, class: ['text-xs-center'] },
    ];
    public tableInfo: DataTableInterface = {
        rowsPerPageItems: [24, 48, 60],
    };
    private delete: number = 0;

    public get tableItems() {
        return this.budget.budgetList;
    }

    public deleteBudget(id: number) {
        this.confirmDialog = true;
        this.delete = id;
    }

    public emitAddBudgetDialog(dialog: boolean) {
        this.addBudgetDialog = dialog;
    }

    public emitConfimDialog(dialog: boolean) {
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
        return !Object.keys(this.budget.budgetTemplate).length;
    }

    private removeBudget() {
        if (this.delete) {
            this.deleteSingleBudget(this.delete)
                .then((res: ResponseInterface) => {
                    if (res.success) {
                        console.log(this.budget.budgetList);
                    }
                });
        }
    }
}

export default List;
