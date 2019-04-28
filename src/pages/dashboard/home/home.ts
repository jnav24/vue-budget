import { Vue, Component } from 'vue-property-decorator';
import ChartLine from '@/components/dashboard/charts/chart-line/ChartLine.vue';
import {ChartDataInterface} from '@/interfaces/chart-data.interface';
import {currencyService, timestampService} from '@/module';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {Getter, State} from 'vuex-class';
import {AggregationStateInterface} from '@/interfaces/aggregation-state.interface';
import {BudgetStateInterface} from '@/interfaces/budget-state.interface';

@Component({
    components: {
        ChartLine,
    },
})
class Home extends Vue {
    @Getter public totalUnpaid: number;
    @State((state: RootStateInterface) => state.Budget) public budgetState: BudgetStateInterface;
    @State((state: RootStateInterface) => state.Aggregation) public aggregationState: AggregationStateInterface;
    public chartOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
    };
    public selectedYear: string = '2019';

    public get budget() {
        return this.budgetState.budgetList;
    }

    public get currentYear() {
        return timestampService.getCurrentTimestamp('UTC', 'YYYY');
    }

    public get budgetAggregate() {
        return this.aggregationState.budget;
    }

    public get averageEarned() {
        return this.getAverage('totalEarned');
    }

    public get totalEarned() {
        return this.getTotal('earned');
    }

    public get averageSaved() {
        return this.getAverage('totalSaved');
    }

    public get totalSaved() {
        return this.getTotal('saved');
    }

    public get averageSpent() {
        return this.getAverage('totalSpent');
    }

    public get totalSpent() {
        return this.getTotal('spent');
    }

    public get isAggregateEmpty() {
        return !Object.keys(this.budgetAggregate).length;
    }

    public get chartData(): ChartDataInterface {
        const earned: string = 'earned';
        const spent: string = 'spent';

        if (
            typeof (this.budgetAggregate as any)[this.selectedYear] !== 'undefined' &&
            typeof (this.budgetAggregate as any)[this.selectedYear][earned] !== 'undefined' &&
            typeof (this.budgetAggregate as any)[this.selectedYear][spent] !== 'undefined'
        ) {
            return {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                    'October', 'November', 'December'],
                datasets: [
                    {
                        label: 'Earned',
                        backgroundColor: 'rgba(68,173,168,0.7)',
                        data: (this.budgetAggregate as any)[this.selectedYear][earned],
                    },
                    {
                        label: 'Spent',
                        backgroundColor: 'rgba(198,40,40,0.5)',
                        data: (this.budgetAggregate as any)[this.selectedYear][spent],
                    },
                ],
            };
        }

        return {
            labels: [],
            datasets: [],
        };
    }

    public get years(): Array<{ value: string; label: string; }> {
        if (typeof (this.budgetAggregate as any)[this.currentYear] !== 'undefined') {
            const allYears: any[] = [];

            for (const year of Object.keys(this.budgetAggregate)) {
                allYears.unshift({ value: year, label: year });
            }

            return allYears;
        }

        return  [
            { value: '2019', label: '2019' },
        ];
    }

    private getAverage(name: string) {
        const defaultSum: string = currencyService.setCurrency('0');
        const currentMonth = timestampService.getCurrentTimestamp('UTC', 'M');

        if (typeof (this as any)[name] !== 'undefined' && (this as any)[name] !== defaultSum) {
            const earned = (this as any)[name].toString().replace('$', '');
            return currencyService.setCurrency((Number(earned) / Number(currentMonth)).toString());
        }

        return defaultSum;
    }

    private getTotal(key: string) {
        if (
            typeof (this.budgetAggregate as any)[this.currentYear] !== 'undefined' &&
            typeof (this.budgetAggregate as any)[this.currentYear][key] !== 'undefined'
        ) {
            let sum = 0;

            for (const value of (this.budgetAggregate as any)[this.currentYear][key]) {
                sum = Number((sum + Number(value)).toFixed(2));
            }

            return sum;
        }

        return currencyService.setCurrency('0');
    }
}

export default Home;
