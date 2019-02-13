import {Prop, Vue} from 'vue-property-decorator';
import {budgetService, globalService} from '@/module';

class Budgets extends Vue {
    @Prop() public data: any;
    public type: string = '';

    public get budgetData() {
        return this.data;
    }

    protected getType(value: string) {
        const typeName = globalService.camelCase(this.type);
        return budgetService.getType(value, typeName);
    }
}

export default Budgets;
