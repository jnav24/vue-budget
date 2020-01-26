import {Vue, Component, Prop, Emit} from 'vue-property-decorator';
import {currencyService, timestampService} from '@/module';
import CreditCardList from '@/components/dashboard/lists/credit-card-list/CreditCardList.vue';
import FourColumnList from '@/components/dashboard/lists/four-column-list/FourColumnList.vue';
import ThreeColumnList from '@/components/dashboard/lists/three-column-list/ThreeColumnList.vue';
import VehicleList from '@/components/dashboard/lists/vehicle-list/VehicleList.vue';

@Component({
    components: {
        CreditCardList,
        FourColumnList,
        ThreeColumnList,
        VehicleList,
    },
})
export default class SearchCard extends Vue {
    @Prop({ required: true }) public card: any;
    @Prop({ required: true }) public type: string;

    public get totalAmount() {
        const total = this.card[this.type].reduce((acc: number, card: Record<string, string>) => {
            return acc + Number(card.amount);
        }, 0);
        this.outputTotal(total);
        return currencyService.setCurrency(total.toString());
    }

    public formatMonth(value: string): string {
        return timestampService.format(value, 'MMMM');
    }

    public getComponentName(name: string): string {
        if (['credit_cards'].indexOf(name) > -1) {
            return 'CreditCardList';
        }

        if (['medical', 'utilities', 'miscellaneous'].indexOf(name) > -1) {
            return 'FourColumnList';
        }

        if (['vehicles'].indexOf(name) > -1) {
            return 'VehicleList';
        }

        return 'ThreeColumnList';
    }

    @Emit('setSummary')
    private outputTotal(total: number) {
        // ...
    }
}
