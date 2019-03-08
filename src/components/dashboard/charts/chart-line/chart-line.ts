import {Vue, Component, Prop} from 'vue-property-decorator';
// @ts-ignore
import InternalLineChart from '@/components/dashboard/charts/InternalLineChart.js';

@Component({
    components: {
        InternalLineChart,
    },
})
export default class ChartLine extends Vue {
    @Prop() public data: any;
    @Prop() public options: any;

    public get currentData() {
        return this.data;
    }
}
