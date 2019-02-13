import {Prop, Vue} from 'vue-property-decorator';
import {budgetService, currencyService, globalService} from '@/module';

class Budgets extends Vue {
    @Prop() public data: any;
    public type: string = '';

    public get budgetData() {
        return this.data;
    }

    protected getType(value: string) {
        const typeName = globalService.camelCase(this.type);
        return budgetService.getType(value, typeName);
    }

    protected getDollarAmount(amount: string) {
        return currencyService.setCurrency(amount);
    }
}

export default Budgets;
