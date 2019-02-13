import { Vue, Component } from 'vue-property-decorator';
import {ResponseInterface} from '@/interfaces/response.interface';
import {Action, State} from 'vuex-class';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {BudgetStateInterface} from '@/interfaces/budget-state.interface';
import Banks from '@/components/dashboard/budgets/banks/Banks.vue';
import {globalService, timestampService} from '@/module';

Component.registerHooks([
    'created',
]);

@Component({
    components: {
        Banks,
    },
})
class Edit extends Vue {
    @Action public getSingleBudget: (id: number) => Promise<ResponseInterface>;
    @State((state: RootStateInterface) => state.Budget) public budgetState: BudgetStateInterface;
    public activeTab: number = 1;
    public budget: any = {};

    public get isLoading() {
        return !Object.keys(this.budget).length;
    }

    public getComponentName(val: string): string {
        return globalService.ucFirst(globalService.camelCase(val));
    }

    public formatCycle(date: string): string {
        return timestampService.format(date, 'MMM YYYY');
    }

    public submit() {
        // @todo if timestamp unix is >= now unix timestamp, then update the templates
    }

    private created() {
        const index = this.budgetState.budgetList.findIndex((obj: any) => obj.id === this.$route.params.id);

        if (
            typeof this.budgetState.budgetList[index] === 'undefined' ||
            typeof this.budgetState.budgetList[index].expenses === 'undefined'
        ) {
            this.getSingleBudget(Number(this.$route.params.id))
                .then((res: ResponseInterface) => {
                    if (res.success) {
                        this.budget = res.data;
                    }
                });
        } else {
            this.budget = this.budgetState.budgetList[index];
        }
    }
}

export default Edit;
