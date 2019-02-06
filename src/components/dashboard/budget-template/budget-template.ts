import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
import {DataTableInterface} from '@/interfaces/data-table.interface';
import {DataTableHeadersInterface} from '@/interfaces/data-table-headers.interface';
import {ResponseInterface} from '@/interfaces/response.interface';
import {Action, Mutation, State} from 'vuex-class';
import {BudgetTemplateRemoveInterface} from '@/interfaces/budget-template-remove.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {BillTypesInterface} from '@/interfaces/bill-types.interface';
import {TypesStateInterface} from '@/interfaces/types-state.interface';
import ConfirmDialog from '@/components/dashboard/dialogs/confirm-dialog/ConfirmDialog.vue';

@Component({
    components: {
        ConfirmDialog,
    },
})
class BudgetTemplate extends Vue {
    @Prop() public name: string;
    @Prop() public data: any;
    @Prop() public headers: DataTableHeadersInterface[];
    @Prop() public type: string;
    @Action public removeTemplateElementAction: (obj: BudgetTemplateRemoveInterface) => Promise<ResponseInterface>;
    @Mutation public removeTemplateElement: (obj: BudgetTemplateRemoveInterface) => void;
    @State((state: RootStateInterface) => state.Types) public types: TypesStateInterface;
    public confirmData: any = {
        text: 'By continuing, this item will be permanently deleted. Are you sure you want to delete this?',
    };
    public confirmDialog: boolean = false;
    public deletedItem: any = {};
    public tableInfo: DataTableInterface = {
        rowsPerPageItems: [25, 50, 75],
    };

    public get tableHeaders() {
        return [...this.headers, { text: 'Actions', value: '' }];
    }

    public get tableList() {
        return this.data;
    }

    public removeElement() {
        if (this.deletedItem.id.toString().indexOf('temp_') > -1 && typeof this.type !== 'undefined') {
            this.removeTemplateElement({ type: this.type, id: this.deletedItem.id });
        } else {
            this.removeTemplateElementAction({ type: this.type, id: this.deletedItem.id })
                .then((res: ResponseInterface) => {
                    if (res.success) {
                        console.log('deleted');
                    }
                });
        }
    }

    public emitConfimDialog(dialog: boolean) {
        this.confirmDialog = dialog;

        if (!dialog) {
            this.deletedItem = {};
        }
    }

    public emitConfirmData(num: number) {
        if (!!num) {
            this.removeElement();
        }
    }

    public get currentType() {
        return this.types.bills.filter((type: BillTypesInterface) => type.slug === this.type).shift();
    }

    public markForDeletion(item: any) {
        this.deletedItem = item;
        this.confirmDialog = true;
    }

    @Emit('emitEditBudget')
    public emitEditBudget(obj: { type: string; data: any }) {
        // ...
    }
}

export default BudgetTemplate;
