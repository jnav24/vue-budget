import {Component} from 'vue-property-decorator';
import {FormInterface} from '@/interfaces/form.interface';
import {globalService, timestampService, validateService} from '@/module';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {BudgetTemplateFormInterface} from '@/components/dashboard/budget-template-form/budget-template-form.interface';
import BudgetTemplateForm from '@/components/dashboard/budget-template-form/budget-template-form';
import BudgetTemplateComponent from '@/components/dashboard/budget-template-form/BudgetTemplateForm.vue';
import ConfirmationForm from '@/components/dashboard/confirmation-form/ConfirmationForm.vue';

@Component({
    components: {
        BudgetTemplateComponent,
        ConfirmationForm,
    },
})
class CreditCard extends BudgetTemplateForm implements BudgetTemplateFormInterface {
    public dates = Array.from(Array(31).keys()).map((num: any) => num + 1);
    public months: any[] = globalService.getMonths();
    public years: any[] = globalService.getYears();
    protected templateForm: FormInterface = {
        name: {
            value: '',
            rules: [
                (v: any) => !!v || 'Name is required',
                (v: any) => validateService.isValidLength(v, 3) || 'Name is not long enough',
            ],
        },
        type: {
            value: 0,
            rules: [
                (v: any) => !!v || 'Credit card type is required',
            ],
        },
        limit: {
            value: '',
            rules: [
                (v: any) => !!v || 'Credit limit is required',
                (v: any) => validateService.isDollarAmount(v) || 'Not a valid dollar amount',
                (v: any) => validateService.isValidLength(v, 4) || 'Credit limit not valid',
            ],
        },
        due: {
            value: 0,
            rules: [
                (v: any) => !!v || 'Due date is required',
            ],
        },
        apr: {
            value: '',
            rules: [
                (v: any) => {
                    if (!!v) {
                        return validateService.isNumeric(v) || 'APR must be numeric';
                    }

                    return true;
                },
                (v: any) => {
                    if (!!v) {
                        // return validateService.isValidLength(v, 1) || 'APR must be at least two characters';
                    }

                    return true;
                },
            ],
        },
        last4: {
            value: '',
            rules: [
                (v: any) => {
                    if (!!v) {
                        return validateService.isNumeric(v) || 'Last 4 digits of your credit card must be numeric';
                    }

                    return true;
                },
                (v: any) => {
                    if (!!v) {
                        return validateService.isValidLength(v, 4) || 'Must be at least 4 characters';
                    }

                    return true;
                },
            ],
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

    public get types() {
        return this.typesState.creditCards;
    }

    public setMonth() {
        if (!this.form.expMonth.value) {
            this.form.expMonth.value = timestampService.getCurrentTimestamp('UTC', 'MM');
        }
    }

    public setYear() {
        if (!this.form.expYear.value) {
            this.form.expYear.value = timestampService.getCurrentTimestamp('UTC', 'YYYY');
        }
    }

    public setupForm() {
        if (typeof this.data !== 'undefined' && Object.keys(this.data).length) {
            this.editMode = true;
            this.form.name.value = this.data.name;
            this.form.due.value = this.data.due_date;
            this.form.limit.value = this.data.limit;
            this.form.type.value = this.data.credit_card_type_id;
            this.form.apr.value = this.data.apr;
            this.form.last4.value = this.data.last_4;
            this.form.expMonth.value = this.data.exp_month;
            this.form.expYear.value = this.data.exp_year;
            this.setupPaidData();
        }
    }

    public setData(): BudgetListAddInterface {
        const data = {
            name: this.form.name.value,
            due_date: this.form.due.value,
            limit: this.form.limit.value,
            credit_card_type_id: this.form.type.value,
            apr: this.form.apr.value || 0,
            last_4: this.form.last4.value,
            exp_month: this.form.expMonth.value,
            exp_year: this.form.expYear.value,
        };

        return this.setDataForSaving(data, 'credit_cards');
    }
}

export default CreditCard;
