import {Vue, Component, Prop} from 'vue-property-decorator';
import {currencyService} from '@/module';

@Component
export default class SearchCardTotals extends Vue {
    @Prop({ required: true }) public summary: Record<string, number>;
    @Prop({ required: true }) public type: string;
    public averageBalance: string = '';
    public endBalance: { month: string; amount: string } = {
        month: '',
        amount: '',
    };
    public highestBalance: { month: string; amount: string } = {
        month: '',
        amount: '',
    };
    public lowestBalance: { month: string; amount: string } = {
        month: '',
        amount: '',
    };
    public percentage: string = '';
    public startBalance: { month: string; amount: string } = {
        month: '',
        amount: '',
    };
    public total: string = '';

    public mounted() {
        this.setSummaryData();
    }

    public get isSaved() {
        return ['banks', 'investments', 'jobs'].indexOf(this.type) > -1;

    }

    public get summaryData() {
        return this.summary;
    }

    public setSummaryData() {
        const months = Object.keys(this.summaryData);
        const dollars = Object.values(this.summaryData);
        const maxDollars = Math.max(...dollars);
        const minDollars = Math.min(...dollars);

        this.averageBalance = currencyService.setCurrency(
            (dollars.reduce((a, c) => a + c, 0) / dollars.length).toString(),
        );

        this.endBalance = {
            month: months[months.length - 1],
            amount: currencyService.setCurrency(dollars[dollars.length - 1].toString()),
        };

        this.lowestBalance.amount = currencyService.setCurrency(minDollars.toString());
        this.highestBalance.amount = currencyService.setCurrency(maxDollars.toString());

        this.lowestBalance.month = months[dollars.indexOf(minDollars)];
        this.highestBalance.month = months[dollars.indexOf(maxDollars)];

        this.percentage = Math.round(((dollars[dollars.length - 1] - dollars[0]) / dollars[0]) * 100) + '%';

        this.startBalance = {
            month: months[0],
            amount: currencyService.setCurrency(dollars[0].toString()),
        };

        if (['banks', 'investments'].indexOf(this.type) > -1) {
            this.total = currencyService.setCurrency((dollars[dollars.length - 1] - dollars[0]).toString());
        } else {
            this.total = currencyService.setCurrency(dollars.reduce((a, c) => a + c, 0).toString());
        }
    }
}
