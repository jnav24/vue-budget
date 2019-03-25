import {Component} from 'vue-property-decorator';
import Budgets from '@/components/dashboard/budgets/budgets';
import {MiscellaneousInterface} from '@/interfaces/miscellaneous.interface';

@Component
class Miscellaneous extends Budgets {
    public mounted() {
        this.type = 'miscellaneous';
        this.getTypeId();
    }

    public isAmountNotTracked(item: MiscellaneousInterface): boolean {
        return !!item.not_track_amount;
    }
}

export default Miscellaneous;
