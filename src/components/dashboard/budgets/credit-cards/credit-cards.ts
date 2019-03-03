import { Component } from 'vue-property-decorator';
import Budgets from '@/components/dashboard/budgets/budgets';
import {CreditCardsInterface} from '@/interfaces/credit-cards.interface';

@Component
class CreditCard extends Budgets {
    public mounted() {
        this.type = 'credit_cards';
        this.getTypeId();
    }

    public hasLast4(item: CreditCardsInterface): boolean {
        return item.last_4 !== null && item.last_4.trim() !== '';
    }

    public hasExpiration(item: CreditCardsInterface): boolean {
        return item.exp_month !== null && item.exp_month !== '0' &&
            item.exp_year !== null && item.exp_year !== '0';
    }
}

export default CreditCard;
