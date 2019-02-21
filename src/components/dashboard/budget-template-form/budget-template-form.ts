import {Emit, Prop, Vue, Component} from 'vue-property-decorator';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {State} from 'vuex-class';
import {TypesStateInterface} from '@/interfaces/types-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {timestampService} from '@/module';
import {FormInterface} from '@/interfaces/form.interface';

Component.registerHooks([
    'created',
    'mounted',
]);

@Component
class BudgetTemplateForm extends Vue {
    @Prop() public data: any;
    @Prop() public dialog: any;
    @Prop({ default: false }) public showPaidForm: boolean;
    @State((state: RootStateInterface) => state.Types) public typesState: TypesStateInterface;
    public editMode: boolean = false;
    protected paidForm: FormInterface = {};
    protected resetForm: boolean = false;
    protected templateForm: FormInterface = {};
    protected templateValid: boolean = false;

    public created() {
        if (this.showPaidForm) {
            this.paidForm = {
                confirmation: {
                    value: '',
                    rules: [],
                },
                paid: {
                    value: '',
                    rules: [],
                },
            };
        }
    }

    public mounted() {
        if (this.dialog) {
            this.setupForm();
        }
    }

    public get form() {
        return { ...this.templateForm, ...this.paidForm };
    }

    public validateForm(obj: { valid: boolean; update: boolean }) {
        this.templateValid = obj.valid;
        const data = this.setData();

        this.closeForm({ valid: obj.valid, data, update: obj.update });
        this.editMode = false;
        this.resetForm = true;
    }

    @Emit('submitForm')
    protected closeForm(data: { valid: boolean, data: any; update: boolean  }) {
        // ...
    }

    protected setupForm() {
        // ....
    }

    protected setDataForSaving(data: any, type: any): BudgetListAddInterface {
        let id: any;
        let paid: any = {};

        if (typeof this.data !== 'undefined' && typeof this.data.id !== 'undefined') {
            id = this.data.id;
        } else {
            id = 'temp_' + timestampService.generateUnixId();
        }

        if (this.showPaidForm) {
            paid = {
                confirmation: this.form.confirmation.value,
                paid: this.form.paid.value,
            };
        }

        return {
            type,
            data: { ...data, id, ...paid },
        };
    }

    protected setData(): BudgetListAddInterface {
        return {
            type: 'blank',
            data: {},
        };
    }

    protected updateForm(obj: any) {
        this.form.confirmation.value = obj.confirmation;
        this.form.paid.value = obj.paid;
    }

    protected setupPaidData() {
        if (this.showPaidForm) {
            this.form.paid.value = this.data.paid_date;
            this.form.confirmation.value = this.data.confirmation;
        }
    }
}

export default BudgetTemplateForm;
