import {Prop, Vue, Component} from 'vue-property-decorator';
import {budgetService, currencyService, globalService, timestampService} from '@/module';

Component.registerHooks([
    'mounted',
]);

class Budgets extends Vue {
    @Prop() public data: any;
    public type: string = '';

    public get budgetData() {
        return this.data;
    }

    protected getDueDate(date: string): string {
        return timestampService.getCurrentTimestamp('UTC', 'MMM') + ' ' + date;
    }

    protected getType(value: string) {
        const typeName = globalService.camelCase(this.type);
        return budgetService.getType(value, typeName);
    }

    protected getDollarAmount(amount: string) {
        return currencyService.setCurrency(amount);
    }

    protected isPaid(item: any): boolean {
        return timestampService.unix() >= timestampService.unix(item.initial_pay_date);
    }
}

export default Budgets;
