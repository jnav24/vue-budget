import {Prop, Vue, Component, Emit} from 'vue-property-decorator';
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
        if (amount === null) {
            return '0';
        }

        return currencyService.setCurrency(amount);
    }

    protected isCheckPaid(item: any): boolean {
        return timestampService.unix() >= timestampService.unix(item.initial_pay_date);
    }

    protected isBillPaid(item: any): boolean {
        return item.paid_date !== null && item.confirmation !== null;
    }

    @Emit('updateEarned')
    protected updateEarned(val: number) {
        // ...
    }

    @Emit('updateSpent')
    protected updateSpent(val: number) {
        // ...
    }
}

export default Budgets;
