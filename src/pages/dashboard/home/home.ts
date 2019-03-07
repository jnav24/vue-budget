import { Vue, Component } from 'vue-property-decorator';
import ChartLine from '@/components/dashboard/charts/chart-line/ChartLine.vue';

@Component({
    components: {
        ChartLine,
    },
})
class Home extends Vue {}

export default Home;
