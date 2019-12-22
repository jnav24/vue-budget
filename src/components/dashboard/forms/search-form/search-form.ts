import { Vue, Component } from 'vue-property-decorator';
import {FormInterface} from '@/interfaces/form.interface';
import {Getter} from 'vuex-class';
import {UrlInterface} from '@/interfaces/url.interface';
import {AxiosResponse} from 'axios';
import {httpService} from '@/module';

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

    public async runSearch() {
        try {
            const url: UrlInterface = {
                url: 'search',
                params: {
                    type: this.form.type.value,
                    year: this.form.year.value,
                },
            };

            const response: AxiosResponse = await httpService.authGet(url);
            console.log(response);
        } catch (error) {
            console.log(error);
            // show results not found
        }
    }
}
