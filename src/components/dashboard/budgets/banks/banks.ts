import {Component} from 'vue-property-decorator';
import Budgets from '@/components/dashboard/budgets/budgets';

@Component
class Banks extends Budgets {
    public mounted() {
        this.type = 'banks';
    }
}

export default Banks;
