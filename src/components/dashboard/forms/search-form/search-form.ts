import {Vue, Component, Emit} from 'vue-property-decorator';
import {FormInterface} from '@/interfaces/form.interface';
import {Getter, State} from 'vuex-class';
import {TypesStateInterface} from '@/store/modules/types/types-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {globalService} from '@/module';
import {BillTypesInterface} from '@/interfaces/bill-types.interface';

@Component
export default class SearchForm extends Vue {
    @Getter public billTypes: Array<{ slug: string; name: string }>;
    @Getter public getTypeBySlug: (slug: string) => BillTypesInterface;
    @Getter public allYears: Array<{ label: string; value: number }>;
    @State((state: RootStateInterface) => state.Types) public types: TypesStateInterface;
    public form: FormInterface = {
        billType: {
            value: '',
            rules: [],
        },
        name: {
            value: '',
            rules: [],
        },
        type: {
            value: '',
            rules: [],
        },
        year: {
            value: '',
            rules: [],
        },
    };
    public years = [];

    public get showTypes() {
        return ['miscellaneous', 'jobs'].indexOf(this.form.billType.value) === -1;
    }

    public get getTypes() {
        const type: string = globalService.camelCase(this.form.billType.value);
        return (this.types as any)[type];
    }

    public get typeLabel() {
        return `Select ${this.getTypeBySlug(this.form.billType.value).name || ''} Type`;
    }

    @Emit('runSearch')
    public runSearch(searchParams: any) {
        // ...
    }
}
