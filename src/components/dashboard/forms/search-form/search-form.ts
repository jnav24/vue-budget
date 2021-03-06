import {Vue, Component, Emit} from 'vue-property-decorator';
import {FormInterface} from '@/interfaces/form.interface';
import {Getter, State} from 'vuex-class';
import {TypesStateInterface} from '@/store/modules/types/types-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {globalService, timestampService} from '@/module';
import {BillTypesInterface} from '@/interfaces/bill-types.interface';

@Component
export default class SearchForm extends Vue {
    @Getter public allYears: Array<{ label: string; value: number }>;
    @Getter public billTypes: Array<{ slug: string; name: string }>;
    @Getter public getTypeBySlug: (slug: string) => BillTypesInterface;
    @Getter public userVehicles: Array<{ label: string; value: number }>;
    @State((state: RootStateInterface) => state.Types) public types: TypesStateInterface;
    public form: FormInterface = {
        billType: {
            value: '',
            rules: [
                (v: any) => !!v || 'Bill type is required',
            ],
        },
        endMonth: {
            value: '12',
            rules: [],
        },
        name: {
            value: '',
            rules: [],
        },
        notes: {
            value: '',
            rules: [],
        },
        startMonth: {
            value: '01',
            rules: [],
        },
        type: {
            value: '',
            rules: [],
        },
        vehicle: {
            value: '',
            rules: [],
        },
        year: {
            value: '',
            rules: [
                (v: any) => !!v || 'Year is required',
            ],
        },
    };
    public formValid: boolean = false;
    public months: Array<{ value: string; label: string; }> = [];
    public years = [];

    public created() {
        this.months = timestampService.getMonthsOfYear('abbr');
    }

    public get showNames() {
        const ignoreList = ['vehicles'];
        return ignoreList.indexOf(this.form.billType.value) === -1;
    }

    public get showNotes() {
        return ['vehicles'].indexOf(this.form.billType.value) > -1;
    }

    public get showTypes() {
        const ignoreList = ['miscellaneous', 'incomes'];
        return ignoreList.indexOf(this.form.billType.value) === -1;
    }

    public get typeList() {
        const type: string = globalService.camelCase(this.form.billType.value);
        return [
            { slug: '', name: 'All' },
            ...(this.types as any)[type],
        ];
    }

    public get vehicleList() {
        return [
            { value: '', label: 'All' },
            ...this.userVehicles,
        ];
    }

    public get typeLabel() {
        return `Select ${this.getTypeBySlug(this.form.billType.value).name || ''} Type`;
    }

    @Emit('runSearch')
    public runSearch(searchParams: any) {
        // ...
    }

    public resetFields(): void {
        this.form.name.value = '';
        this.form.notes.value = '';
        this.form.type.value = '';
        this.form.vehicle.value = '';
    }
}
