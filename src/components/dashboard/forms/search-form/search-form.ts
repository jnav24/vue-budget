import { Vue, Component } from 'vue-property-decorator';
import {FormInterface} from '@/interfaces/form.interface';

@Component
export default class SearchForm extends Vue {
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
    public types = [];
    public years = [];
}
