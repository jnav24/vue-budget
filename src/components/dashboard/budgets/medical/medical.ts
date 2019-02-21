import {Component} from 'vue-property-decorator';
import Budgets from '@/components/dashboard/budgets/budgets';

@Component
class Medical extends Budgets {
    public mounted() {
        this.type = 'medical';
        this.getTypeId();
    }
}

export default Medical;
