import {Vue, Component, Prop} from 'vue-property-decorator';
import {currencyService, timestampService} from '@/module';

@Component
export default class SearchCard extends Vue {
    @Prop({ required: true }) public card: any;
    @Prop({ required: true }) public type: string;

    public get totalAmount() {
        return currencyService.setCurrency(this.card[this.type].reduce((acc: number, card: Record<string, string>) => {
            return acc + Number(card.amount);
        }, 0).toString());
    }

    public formatMonth(value: string): string {
        return timestampService.format(value, 'MMMM');
    }
}
