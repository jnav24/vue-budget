import {Vue, Component, Prop} from 'vue-property-decorator';
import {currencyService} from '@/module';

@Component
export default class Totals extends Vue {
    @Prop({ default: 'success' }) public amountColor: string;
    @Prop({ default: false }) public dynamicColor: boolean;
    @Prop({ default: '0.00' }) public totalAmount: string;
    @Prop() public totalTitle: string;
    @Prop({ default: true }) public trending: boolean;

    public get formatDollar(): string {
        return currencyService.setCurrency(this.totalAmount);
    }
}
