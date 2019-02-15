import { Component } from 'vue-property-decorator';
import Budgets from '@/components/dashboard/budgets/budgets';

@Component
class CreditCard extends Budgets {
    public mounted() {
        this.type = 'credit_cards';
    }
}

export default CreditCard;
