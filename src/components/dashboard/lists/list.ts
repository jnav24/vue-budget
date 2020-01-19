import {Prop, Vue} from 'vue-property-decorator';
import {State} from 'vuex-class';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {TypesStateInterface} from '@/store/modules/types/types-state.interface';
import {currencyService, timestampService} from '@/module';

export default abstract class List extends Vue {
    @Prop({ required: true }) public data: any;
    @Prop({ required: true }) public type: string;
    @Prop({ default: true, required: true }) public showDivider: boolean;
    @State((state: RootStateInterface) => state.Types) public typesState: TypesStateInterface;

    protected setCurrency(price: string): string {
        return currencyService.setCurrency(price);
    }

    protected setPaidDate(value: string): string {
        return timestampService.format(value, 'YYYY-MM-DD');
    }

    protected getValueFromType(data: any): string | null {
        const keys = Object.keys(data);
        let index = '';

        for (const type of keys) {
            if (type.includes('type')) {
                index = type;
            }
        }

        return !!index ? this.getTypeFromState(data[index]) : null;
    }

    private getTypeFromState(val: number): string {
        if (!!(this.typesState as any)[this.type]) {
            const typeObj = (this.typesState as any)[this.type].find((obj: any) => obj.id === val);

            if (!!typeObj.name) {
                return typeObj.name;
            }
        }

        return '';
    }
}
