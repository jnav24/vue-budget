import { Vue, Component} from 'vue-property-decorator';
import AddBudgetExpense from '@/components/dashboard/dialogs/add-budget-expense/AddBudgetExpense.vue';
import EmptyState from '@/components/dashboard/empty-state/EmptyState.vue';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {Getter, State} from 'vuex-class';
import {BudgetStateInterface} from '@/interfaces/budget-state.interface';

@Component({
    components: {
        AddBudgetExpense,
        EmptyState,
    },
})
class Template extends Vue {
    @Getter public hasBudgetTemplate: number;
    @State((state: RootStateInterface) => state.Budget) public budget: BudgetStateInterface;
    public expenseDialog: boolean = false;
}

export default Template;
