import { Vue, Component } from 'vue-property-decorator';
import {Action, State} from 'vuex-class';
import {DataTableInterface} from '@/interfaces/data-table.interface';
import ConfirmDialog from '@/components/dashboard/dialogs/confirm-dialog/ConfirmDialog.vue';
import EmptyState from '@/components/dashboard/empty-state/EmptyState.vue';
import {ResponseInterface} from '@/interfaces/response.interface';

@Component({
    components: {
        ConfirmDialog,
        EmptyState,
    },
})
class List extends Vue {
    @Action public deleteSingleBudget: (num: number) => Promise<ResponseInterface>;
    @State((state: any) => state.Budget) public budget: any;
    public confirmData: any = {
        text: 'Are you sure you want to delete this budget?',
    };
    public confirmDialog: boolean = false;
    public tableHeaders: any = [
        { text: 'Name', value: 'name', class: ['text-xs-center'] },
        { text: 'Date', value: 'created_at', class: ['text-xs-center'] },
        { text: 'Actions', value: '', class: ['text-xs-center'] },
    ];
    public tableInfo: DataTableInterface = {
        rowsPerPageItems: [24, 48, 60],
    };
    private delete: number = 0;

    public get tableItems() {
        return this.budget.budgetList;
    }

    public goToBudgetTemplate() {
        console.log('clicked');
    }

    public deleteBudget(id: number) {
        this.confirmDialog = true;
        this.delete = id;
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
