import {Vue, Component, Emit, Prop} from 'vue-property-decorator';
import {FormInterface} from '@/interfaces/form.interface';
import {timestampService} from '@/module';

Component.registerHooks([
    'updated',
]);

@Component
class ConfirmationForm extends Vue {
    @Prop() public data: any;
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

    public updated() {
        if (typeof this.data !== 'undefined' && this.data !== null) {
            if (typeof this.data.confirmation.value === 'string' && this.data.confirmation.value !== null) {
                this.form.confirmation.value = this.data.confirmation.value;
            }

            if (typeof this.data.paid.value === 'string' && this.data.paid.value !== null) {
                this.form.paid.value = timestampService.format(this.data.paid.value, 'YYYY-MM-DD');
            }
        }
    }

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
