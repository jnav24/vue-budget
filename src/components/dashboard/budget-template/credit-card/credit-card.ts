import { Vue, Component } from 'vue-property-decorator';
import {FormInterface} from '@/interfaces/form.interface';
import {globalService} from '@/module';

@Component
class CreditCard extends Vue {
    public creditCardTypes = [
        {id: 1, name: 'Visa'},
    ];
    public dates = [1, 2, 3];
    public form: FormInterface = {
        name: {
            value: '',
            rules: [],
        },
        type: {
            value: 0,
            rules: [],
        },
        limit: {
            value: 0,
            rules: [],
        },
        due: {
            value: 0,
            rules: [],
        },
        apr: {
            value: 0,
            rules: [],
        },
        last4: {
            value: 0,
            rules: [],
        },
        expMonth: {
            value: 0,
            rules: [],
        },
        expYear: {
            value: 0,
            rules: [],
        },
    };
    public months: any[] = globalService.getMonths();
    public years: any[] = globalService.getYears();
    public templateValid: boolean = false;
}

export default CreditCard;
