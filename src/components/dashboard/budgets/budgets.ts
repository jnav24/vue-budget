import {Prop, Vue, Component, Emit} from 'vue-property-decorator';
import {budgetService, currencyService, globalService, timestampService} from '@/module';

Component.registerHooks([
    'mounted',
]);

class Budgets extends Vue {
    @Prop() public cycle: any;
    @Prop() public data: any;
    public type: string = '';
    protected typeId: number = 0;

    public get budgetData() {
        return this.data;
    }

    @Emit('openEditBudget')
    public openEditBudget(obj: { type: number; data: any }) {
        // ...
    }

    protected getDueDate(date: string): string {
        return timestampService.format(this.cycle, 'MMM') + ' ' + date;
    }

    protected getType(value: string) {
        const typeName = globalService.camelCase(this.type);
        return budgetService.getType(value, typeName);
    }

    protected getTypeId() {
        this.typeId = budgetService.getBillTypeId(this.type);
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
}

export default Budgets;
