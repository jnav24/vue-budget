import { Vue, Component, Prop } from 'vue-property-decorator';
import {DataTableInterface} from '@/interfaces/data-table.interface';
import {DataTableHeadersInterface} from '@/interfaces/data-table-headers.interface';
import {ResponseInterface} from '@/interfaces/response.interface';
import {Action, Mutation} from 'vuex-class';
import {BudgetTemplateRemoveInterface} from '@/interfaces/budget-template-remove.interface';

@Component
class BudgetTemplate extends Vue {
    @Prop() public name: string;
    @Prop() public data: any;
    @Prop() public headers: DataTableHeadersInterface[];
    @Prop() public type: string;
    @Action public removeTemplateElementAction: (obj: BudgetTemplateRemoveInterface) => Promise<ResponseInterface>;
    @Mutation public removeTemplateElement: (obj: BudgetTemplateRemoveInterface) => void;
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
}

export default BudgetTemplate;
