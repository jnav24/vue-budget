import { Vue, Component } from 'vue-property-decorator';
import SearchForm from '@/components/dashboard/forms/search-form/SearchForm.vue';
import EmptyState from '@/components/dashboard/empty-state/EmptyState.vue';
import {UrlInterface} from '@/interfaces/url.interface';
import {AxiosResponse} from 'axios';
import {httpService, timestampService} from '@/module';

@Component({
    components: {
        EmptyState,
        SearchForm,
    },
})
export default class Search extends Vue {
    public loading: boolean = false;
    public searchResults: any = [];
    public showEmptyState: boolean = true;
    public type: string;

    public async runSearch(searchParams: any) {
        try {
            this.showEmptyState = false;
            const url: UrlInterface = {
                url: 'search',
                params: {
                    billType: searchParams.billType.value,
                    year: searchParams.year.value,
                },
            };
            const ignore = ['billType', 'year'];

            for (const param of Object.keys(searchParams)) {
                if (ignore.indexOf(param) === -1) {
                    if (!!searchParams[param]!.value.trim()) {
                        // @ts-ignore
                        url.params[param] = searchParams[param].value;
                    }
                }
            }

            this.type = searchParams.billType.value;
            const response: AxiosResponse = await httpService.authGet(url);
            this.searchResults = response.data.data.data;
            console.log(response);
        } catch (error) {
            console.log(error);
            this.searchResults = [];
        }
    }

    public formatMonth(value: string): string {
        return timestampService.format(value, 'MMMM');
    }
}
