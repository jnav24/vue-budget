import { Component } from 'vue-property-decorator';
import Budgets from '@/components/dashboard/budgets/budgets';

@Component
class CreditCard extends Budgets {
    public mounted() {
        this.type = 'credit_cards';
    }

    // @todo add interface
    public isPaid(item: any): boolean {
        return item.paid_date !== null && item.confirmation !== null;
    }
}

export default CreditCard;
