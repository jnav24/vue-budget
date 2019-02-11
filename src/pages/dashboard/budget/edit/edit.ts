import { Vue, Component } from 'vue-property-decorator';
import {ResponseInterface} from '@/interfaces/response.interface';
import {Action, State} from 'vuex-class';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {BudgetStateInterface} from '@/interfaces/budget-state.interface';

Component.registerHooks([
    'created',
]);

@Component
class Edit extends Vue {
    @Action public getSingleBudget: (id: number) => Promise<ResponseInterface>;
    @State((state: RootStateInterface) => state.Budget) public budgetState: BudgetStateInterface;
    public activeTab: number = 1;
    public budgetIndex: number = -1;

    public get budget() {
        return this.budgetState.budgetList[this.budgetIndex];
    }

    private created() {
        if (typeof this.budget === 'undefined' || typeof this.budget.expenses === 'undefined') {
            this.getSingleBudget(Number(this.$route.params.id))
                .then((res: ResponseInterface) => {
                    this.budgetIndex = this.budgetState.budgetList
                        .findIndex((obj: any) => obj.id === this.$route.params.id);
                });
        } else {
            this.budgetIndex = this.budgetState.budgetList.findIndex((obj: any) => obj.id === this.$route.params.id);
        }
    }
}

export default Edit;
