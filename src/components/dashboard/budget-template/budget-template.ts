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
import {globalService} from '@/module';

@Component({
    components: {
        ConfirmDialog,
    },
})
class BudgetTemplate extends Vue {
    @Prop() public name: string;
    @Prop() public data: any[];
    @Prop() public headers: DataTableHeadersInterface[];
    @Prop() public type: string;
    @Action public removeTemplateElementAction: (obj: BudgetTemplateRemoveInterface) => Promise<ResponseInterface>;
    @State((state: RootStateInterface) => state.Types) public types: TypesStateInterface;
    public alertData: any = {
        text: '',
        type: '',
    };
    public confirmData: any = {
        text: 'By continuing, this item will be permanently deleted. Are you sure you want to delete this?',
    };
    public confirmDialog: boolean = false;
    public deletedItem: any = {};
    public tableInfo: DataTableInterface = {
        rowsPerPageItems: [25, 50, 75],
    };

    public get headerKeys() {
        return globalService.arrayColumn('value', this.headers);
    }

    public get tableHeaders() {
        return [...this.headers, { text: 'Actions', value: '' }];
    }

    public get tableList() {
        return this.data;
    }

    public removeElement() {
        if (this.deletedItem.id.toString().indexOf('temp_') > -1 && typeof this.type !== 'undefined') {
            const index = this.tableList.findIndex((item: any) => item.id === this.deletedItem.id);

            if (index > -1) {
                this.tableList.splice(index, 1);
            }
        } else {
            this.removeTemplateElementAction({ type: this.type, id: this.deletedItem.id })
                .then((res: ResponseInterface) => {
                    if (res.success) {
                        this.alertData.text = 'Item has been removed successfully!';
                        this.alertData.type = 'success';
                    } else {
                        this.alertData.text = 'Item couldn\'t be removed at this time. Please try again later.';
                        this.alertData.type = 'danger';
                    }

                    this.emitRemoveBudget(this.alertData);
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

    public get currentType(): BillTypesInterface | undefined {
        return this.types.bills.filter((type: BillTypesInterface) => type.slug === this.type).shift();
    }

    public markForDeletion(item: any) {
        this.deletedItem = item;
        this.confirmDialog = true;
    }

    public getType(value: any) {
        let result = value;
        const typeName: string = globalService.camelCase(this.type);

        if (typeof (this.types as any)[typeName] !== 'undefined') {
            const index = (this.types as any)[typeName].findIndex((obj: any) => obj.id === Number(value));

            if (index > -1) {
                result = (this.types as any)[typeName][index].name;
            }
        }

        return result;
    }

    @Emit('emitEditBudget')
    public emitEditBudget(obj: { type: string; data: any }) {
        // ...
    }

    @Emit('emitRemoveBudget')
    public emitRemoveBudget(obj: any) {
        // ...
    }
}

export default BudgetTemplate;
