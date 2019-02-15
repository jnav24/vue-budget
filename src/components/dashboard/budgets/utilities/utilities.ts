import {Component} from 'vue-property-decorator';
import Budgets from '@/components/dashboard/budgets/budgets';

@Component
class Utilities extends Budgets {
    public mounted() {
        this.type = 'utilities';
    }
}

export default Utilities;
