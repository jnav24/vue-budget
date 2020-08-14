import { Vue, Component } from 'vue-property-decorator';
import SearchCard from '@/components/dashboard/cards/search-card/SearchCard.vue';
import SearchCardTotals from '@/components/dashboard/cards/search-card-totals/SearchCardTotals.vue';
import SearchForm from '@/components/dashboard/forms/search-form/SearchForm.vue';
import EmptyState from '@/components/dashboard/empty-state/EmptyState.vue';
import LoadingState from '@/components/dashboard/loading-state/LoadingState.vue';
import {UrlInterface} from '@/interfaces/url.interface';
import {AxiosResponse} from 'axios';
import {httpService, timestampService, currencyService} from '@/module';

@Component({
    components: {
        EmptyState,
        LoadingState,
        SearchCard,
        SearchCardTotals,
        SearchForm,
    },
})
export default class Search extends Vue {
    public loading: boolean = false;
    public searchResults: any = [];
    public showEmptyState: boolean = true;
    public summary: Record<string, number> = {};
    public type: string;

    public async runSearch(searchParams: any) {
        try {
            this.loading = true;
            this.searchResults = [];
            this.summary = {};
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
                    const searchValue = searchParams[param]!.value.toString();
                    if (!!searchValue.trim()) {
                        // @ts-ignore
                        url.params[param] = searchValue;
                    }
                }
            }

            this.type = searchParams.billType.value;
            const response: AxiosResponse = await httpService.authPost(url);
            this.searchResults = response.data.data.data.filter((res: any) => res[searchParams.billType.value].length);
        } catch (error) {
            this.searchResults = [];
        } finally {
            this.loading = false;
        }
    }

    public setSummary(e: number, cycle: string) {
        this.summary[timestampService.format(cycle, 'MMMM')] = e;
    }
}
