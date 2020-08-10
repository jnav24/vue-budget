import { Component } from 'vue-property-decorator';
import Budgets from '@/components/dashboard/budgets/budgets';

@Component
export default class CommonBudget extends Budgets {
    public typeName = '';

    public mounted() {
        const expenseKeys = Object.keys(this.data[0]);
        this.typeName = expenseKeys.filter(type => type.indexOf('_type_id') > -1)?.shift() ?? '';
        this.type = this.typeName.split('_type_id')[0];
        this.getTypeId();
    }
}
