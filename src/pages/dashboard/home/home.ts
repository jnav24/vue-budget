import { Vue, Component } from 'vue-property-decorator';
import ChartLine from '@/components/dashboard/charts/chart-line/ChartLine.vue';
import {ChartDataInterface} from '@/interfaces/chart-data.interface';
import {timestampService} from '@/module';

@Component({
    components: {
        ChartLine,
    },
})
class Home extends Vue {
    public chartOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
    };
    public chartData: ChartDataInterface = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
            'October', 'November', 'December'],
        datasets: [
            {
                label: 'Savings',
                backgroundColor: 'rgba(68,173,168,0.7)',
                data: [40.3, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
            },
            {
                label: 'Spent',
                backgroundColor: 'rgba(198,40,40,0.5)',
                data: [80, 70, 62, 59, 30, 70, 29, 90, 30, 20, 42, 61],
            },
        ],
    };
    public selectedYear: string = '2019';
    public years: Array<{ value: string; label: string; }> = [
        { value: '2019', label: '2019' },
    ];

    public get currentYear() {
        return timestampService.getCurrentTimestamp('UTC', 'YYYY');
    }
}

export default Home;
