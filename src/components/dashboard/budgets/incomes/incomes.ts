import {Component} from 'vue-property-decorator';
import Budgets from '@/components/dashboard/budgets/budgets';
import {timestampService} from '@/module';

@Component
class Incomes extends Budgets {
    public mounted() {
        this.type = 'incomes';
        this.getTypeId();
    }

    public getPaidDate(date: string): string {
        return timestampService.format(date, 'MMM DD');
    }
}

export default Incomes;
