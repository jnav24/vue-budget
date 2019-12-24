import { Vue, Component } from 'vue-property-decorator';
import SearchForm from '@/components/dashboard/forms/search-form/SearchForm.vue';
import EmptyState from '@/components/dashboard/empty-state/EmptyState.vue';

@Component({
    components: {
        EmptyState,
        SearchForm,
    },
})
export default class Search extends Vue {
    public searchResults: any = [];
    public showEmptyState: boolean = true;
}
