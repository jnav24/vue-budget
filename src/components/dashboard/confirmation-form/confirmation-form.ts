import {Vue, Component, Emit} from 'vue-property-decorator';
import {FormInterface} from '@/interfaces/form.interface';
import {timestampService} from '@/module';

@Component
class ConfirmationForm extends Vue {
    public form: FormInterface = {
        confirmation: {
            value: '',
            rules: [
                (v: any) => !!v || 'Please enter a confirmation number',
            ],
        },
        paid: {
            value: timestampService.getCurrentTimestamp('UTC', 'YYYY-MM-DD'),
            rules: [
                (v: any) => !!v || 'Please enter a paid date',
            ],
        },
    };
    public menu: boolean = false;
    public picker: boolean = true;

    public updateData() {
        this.updateFormData({
            confirmation: this.form.confirmation.value,
            paid: this.form.paid.value,
        });
    }

    @Emit('updateFormData')
    private updateFormData(obj: { confirmation: string; paid: string }) {
        // ...
    }
}

export default ConfirmationForm;
