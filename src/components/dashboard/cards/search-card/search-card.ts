import {Vue, Component, Prop} from 'vue-property-decorator';
import {timestampService} from '@/module';

@Component
export default class SearchCard extends Vue {
    @Prop({ required: true }) public card: any;
    @Prop({ required: true }) public type: string;

    public formatMonth(value: string): string {
        return timestampService.format(value, 'MMMM');
    }
}
