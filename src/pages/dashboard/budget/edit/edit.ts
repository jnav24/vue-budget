import { Vue, Component } from 'vue-property-decorator';
import {ResponseInterface} from '@/interfaces/response.interface';
import {Action, State} from 'vuex-class';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {BudgetStateInterface} from '@/interfaces/budget-state.interface';
import Banks from '@/components/dashboard/budgets/banks/Banks.vue';
import CreditCards from '@/components/dashboard/budgets/credit-cards/CreditCards.vue';
import Investments from '@/components/dashboard/budgets/investments/Investments.vue';
import {currencyService, globalService, timestampService} from '@/module';

Component.registerHooks([
    'created',
]);

@Component({
    components: {
        Banks,
        CreditCards,
        Investments,
    },
})
class Edit extends Vue {
    @Action public getSingleBudget: (id: number) => Promise<ResponseInterface>;
    @State((state: RootStateInterface) => state.Budget) public budgetState: BudgetStateInterface;
    public activeTab: number = 0;
    public budget: any = {};

    public get canSaveBudget() {
        return false;
    }

    public get isLoading() {
        return !Object.keys(this.budget).length;
    }

    public getComponentName(val: string): string {
        return globalService.ucFirst(globalService.camelCase(val));
    }

    public formatCycle(date: string): string {
        return timestampService.format(date, 'MMM YYYY');
    }

    public formatDollar(dollar: string): string {
        return currencyService.setCurrency(dollar);
    }

    public setTabName(value: string): string {
        return value.replace('_', ' ');
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
