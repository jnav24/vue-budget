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
        const actualEndDay: string = timestampService.getEndDayOfMonth(this.cycle, 'D');
        let day: string = date;

        if (Number(date) > Number(actualEndDay)) {
            day = actualEndDay;
        }

        return timestampService.format(this.cycle, 'MMM') + ' ' + day;
    }

    protected setPaidDate(date: string): string {
        return timestampService.format(date, 'MMM D');
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
        return item.paid_date !== null && typeof item.paid_date === 'string' && item.paid_date.trim() !== '' &&
            item.confirmation !== null && typeof item.confirmation === 'string' && item.confirmation.trim() !== '';
    }
}

export default Budgets;
