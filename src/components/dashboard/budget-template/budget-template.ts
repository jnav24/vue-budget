import { Vue, Component, Prop } from 'vue-property-decorator';
import {DataTableInterface} from '@/interfaces/data-table.interface';
import {DataTableHeadersInterface} from '@/interfaces/data-table-headers.interface';

@Component
class BudgetTemplate extends Vue {
    @Prop() public data: any;
    @Prop() public headers: DataTableHeadersInterface[];
    public tableInfo: DataTableInterface = {
        rowsPerPageItems: [25, 50, 75],
    };

    public get tableHeaders() {
        return this.headers;
    }

    public get tableList() {
        return this.data;
    }
}

export default BudgetTemplate;
