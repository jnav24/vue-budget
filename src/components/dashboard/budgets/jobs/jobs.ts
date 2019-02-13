import {Component} from 'vue-property-decorator';
import Budgets from '@/components/dashboard/budgets/budgets';
import {timestampService} from '@/module';

@Component
class Jobs extends Budgets {
    public mounted() {
        this.type = 'jobs';
    }

    public getPaidDate(date: string): string {
        return timestampService.format(date, 'MMM DD');
    }

    public isPaid(item: any): boolean {
        return timestampService.unix() >= timestampService.unix(item.initial_pay_date);
    }
}

export default Jobs;
