import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
import {DataTableInterface} from '@/interfaces/data-table.interface';
import {DataTableHeadersInterface} from '@/interfaces/data-table-headers.interface';
import {ResponseInterface} from '@/interfaces/response.interface';
import {Action, Mutation, State} from 'vuex-class';
import {BudgetTemplateRemoveInterface} from '@/interfaces/budget-template-remove.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {BillsStateInterface} from '@/interfaces/bills-state.interface';
import {BillTypesInterface} from '@/interfaces/bill-types.interface';

@Component
class BudgetTemplate extends Vue {
    @Prop() public name: string;
    @Prop() public data: any;
    @Prop() public headers: DataTableHeadersInterface[];
    @Prop() public type: string;
    @Action public removeTemplateElementAction: (obj: BudgetTemplateRemoveInterface) => Promise<ResponseInterface>;
    @Mutation public removeTemplateElement: (obj: BudgetTemplateRemoveInterface) => void;
    @State((state: RootStateInterface) => state.Bills) public bills: BillsStateInterface;
    public tableInfo: DataTableInterface = {
        rowsPerPageItems: [25, 50, 75],
    };

    public get tableHeaders() {
        return [...this.headers, { text: 'Actions', value: '' }];
    }

    public get tableList() {
        return this.data;
    }

    public removeElement(item: any) {
        if (item.id.indexOf('temp_') > -1 && typeof this.type !== 'undefined') {
            this.removeTemplateElement({ type: this.type, id: item.id });
        } else {
            this.removeTemplateElementAction({ type: this.type, id: item.id });
        }
    }

    public get currentType() {
        return this.bills.types.filter((type: BillTypesInterface) => type.slug === this.type).shift();
    }

    @Emit('emitEditBudget')
    public emitEditBudget(obj: { type: string; data: any }) {
        // ...
    }
}

export default BudgetTemplate;
