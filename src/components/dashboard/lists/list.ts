import {Prop, Vue} from 'vue-property-decorator';
import {Getter, State} from 'vuex-class';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {TypesStateInterface} from '@/store/modules/types/types-state.interface';
import {currencyService, timestampService, globalService} from '@/module';
import {BillTypesInterface} from '@/interfaces/bill-types.interface';

export default abstract class List extends Vue {
    @Prop({ required: true }) public data: any;
    @Prop({ required: true }) public type: string;
    @Prop({ default: true, required: true }) public showDivider: boolean;
    @Prop({ default: true, required: true }) public hideHead: boolean;
    @Getter public billTypes: BillTypesInterface[];
    @State((state: RootStateInterface) => state.Types) public typesState: TypesStateInterface;

    public get isSpentList() {
        const saveList = globalService.arrayColumn('slug', this.billTypes.filter((type) => !!type.save_type));
        return saveList.indexOf(this.type) === -1;
    }

    public setCurrency(price: string): string {
        return currencyService.setCurrency(price);
    }

    public setPaidDate(value: string): string {
        return timestampService.format(value, 'YYYY-MM-DD');
    }

    public getValueFromType(data: any): string | null {
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
        const type = globalService.camelCase(this.type);
        if (!!(this.typesState as any)[type]) {
            const typeObj = (this.typesState as any)[type].find((obj: any) => obj.id === val);

            if (!!typeObj.name) {
                return typeObj.name;
            }
        }

        return '';
    }
}
