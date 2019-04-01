import { Component } from 'vue-property-decorator';
import Budgets from '@/components/dashboard/budgets/budgets';

@Component
export default class Vehicles extends Budgets {
    public mounted() {
        this.type = 'vehicles';
        this.getTypeId();
    }
}
