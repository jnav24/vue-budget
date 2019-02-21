import {Component} from 'vue-property-decorator';
import Budgets from '@/components/dashboard/budgets/budgets';

@Component
class Miscellaneous extends Budgets {
    public mounted() {
        this.type = 'miscellaneous';
        this.getTypeId();
    }
}

export default Miscellaneous;
