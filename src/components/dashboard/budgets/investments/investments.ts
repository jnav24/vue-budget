import { Component } from 'vue-property-decorator';
import Budgets from '@/components/dashboard/budgets/budgets';

@Component
class Investments extends Budgets {
    public mounted() {
        this.type = 'investments'
    }
}

export default Investments;
