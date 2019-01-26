import { Vue, Component } from 'vue-property-decorator';
import {State} from 'vuex-class';
import {DataTableInterface} from '@/interfaces/data-table.interface';
import EmptyState from '@/components/dashboard/empty-state/EmptyState.vue';

@Component({
    components: {
        EmptyState,
    },
})
class List extends Vue {
    @State((state: any) => state.Budget) public budget: any;
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
}

export default List;
