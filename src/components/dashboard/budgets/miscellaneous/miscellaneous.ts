import {Component} from 'vue-property-decorator';
import Budgets from '@/components/dashboard/budgets/budgets';

@Component
class Miscellaneous extends Budgets {
    public mounted() {
        this.type = 'miscellaneous';
    }
}

export default Miscellaneous;
