import {Vue, Component, Emit} from 'vue-property-decorator';
import {FormInterface} from '@/interfaces/form.interface';
import {Getter} from 'vuex-class';

@Component
export default class SearchForm extends Vue {
    @Getter public billTypes: Array<{ slug: string; name: string }>;
    @Getter public allYears: Array<{ label: string; value: number }>;
    public form: FormInterface = {
        search: {
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

    @Emit('runSearch')
    public runSearch(searchParams: any) {
        // ...
    }
}
