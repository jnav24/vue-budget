import { Vue, Component } from 'vue-property-decorator';
import SearchForm from '@/components/dashboard/forms/search-form/SearchForm.vue';

@Component({
    components: {
        SearchForm,
    },
})
export default class Search extends Vue {

}
