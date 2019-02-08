import { Vue, Component } from 'vue-property-decorator';
import {Route} from 'vue-router';
import {budgetService} from '@/module';
import {ResponseInterface} from '@/interfaces/response.interface';
import {Action} from 'vuex-class';

Component.registerHooks([
    'beforeRouteEnter',
]);

@Component
class Edit extends Vue {
    @Action public getSingleBudget: (id: number) => Promise<ResponseInterface>;
    private expenseList: any[] = [];

    public get expenses() {
        return this.expenseList;
    }

    public set expenses(list: any[]) {
        this.expenseList = list;
    }

    private getBudgetData(id: number) {
        this.getSingleBudget(id)
            .then((res: ResponseInterface) => {
                // ...
            });
    }

    private beforeRouteEnter(to: Route, from: Route, next: any) {
        next((vm: any) => {
            const index = vm.$store.state.Budget.budgetList.findIndex((obj: any) => obj.id === to.params.id);

            if (typeof vm.$store.state.Budget.budgetList[index] !== 'undefined') {
                if (budgetService.isExpenseListEmpty(vm.$store.state.Budget.budgetList[index].expenses)) {
                    vm.getBudgetData(to.params.id);
                } else {
                    vm.expenses = vm.$store.state.Budget.budgetList[index].expenses;
                }
            }
        });
    }
}

export default Edit;
