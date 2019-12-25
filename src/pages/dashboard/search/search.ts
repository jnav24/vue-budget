import { Vue, Component } from 'vue-property-decorator';
import SearchForm from '@/components/dashboard/forms/search-form/SearchForm.vue';
import EmptyState from '@/components/dashboard/empty-state/EmptyState.vue';
import {UrlInterface} from '@/interfaces/url.interface';
import {AxiosResponse} from 'axios';
import {httpService} from '@/module';

@Component({
    components: {
        EmptyState,
        SearchForm,
    },
})
export default class Search extends Vue {
    public searchResults: any = [];
    public showEmptyState: boolean = true;

    public async runSearch(searchParams: any) {
        try {
            this.showEmptyState = false;
            const url: UrlInterface = {
                url: 'search',
                params: {
                    type: searchParams.type.value,
                    year: searchParams.year.value,
                },
            };

            const response: AxiosResponse = await httpService.authGet(url);
            console.log(response);
        } catch (error) {
            console.log(error);
            this.searchResults = [];
        }
    }
}
