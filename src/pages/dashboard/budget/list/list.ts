import { Vue, Component } from 'vue-property-decorator';
import {State} from 'vuex-class';
import {DataTableInterface} from '@/interfaces/data-table.interface';
import ConfirmDialog from '@/components/dashboard/dialogs/confirm-dialog/ConfirmDialog.vue';
import EmptyState from '@/components/dashboard/empty-state/EmptyState.vue';

@Component({
    components: {
        ConfirmDialog,
        EmptyState,
    },
})
class List extends Vue {
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

    public get tableItems() {
        return this.budget.budgetList;
    }

    public goToBudgetTemplate() {
        console.log('clicked');
    }

    public deleteBudget() {
        this.confirmDialog = true;
    }

    public emitConfimDialog(dialog: boolean) {
        this.confirmDialog = dialog;
    }

    public emitConfirmData(num: number) {
        console.log(!!num);
    }
}

export default List;
