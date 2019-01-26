import { Vue, Component } from 'vue-property-decorator';
import {DataTableInterface} from '@/interfaces/data-table.interface';

@Component
class List extends Vue {
    public tableHeaders: any = [
        { text: 'Type', value: 'inbound', class: ['text-xs-center'] },
    ];
    public tableInfo: DataTableInterface = {
        rowsPerPageItems: [24, 48, 60],
    };
    public tableItems: any;
}

export default List;
