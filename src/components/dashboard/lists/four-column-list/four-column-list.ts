import {Vue, Component, Prop} from 'vue-property-decorator';
import {State} from 'vuex-class';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {TypesStateInterface} from '@/store/modules/types/types-state.interface';

@Component
export default class FourColumnList extends Vue {
    @Prop({ required: true }) public data: any;
    @Prop({ required: true }) public type: string;
    @State((state: RootStateInterface) => state.Types) public typesState: TypesStateInterface;

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
        if (!!(this.typesState as any)[this.type]) {
            const typeObj = (this.typesState as any)[this.type].find((obj: any) => obj.id === val);

            if (!!typeObj.name) {
                return typeObj.name;
            }
        }

        return '';
    }
}
