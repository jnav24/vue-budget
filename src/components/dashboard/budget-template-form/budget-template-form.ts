import {Emit, Prop, Vue, Component} from 'vue-property-decorator';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {State} from 'vuex-class';
import {TypesStateInterface} from '@/interfaces/types-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {timestampService} from '@/module';
import {FormInterface} from '@/interfaces/form.interface';

Component.registerHooks([
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

    public mounted() {
        if (this.dialog) {
            this.setupForm();
        }

        if (this.showPaidForm) {
            this.paidForm = {
                confirmation: {
                    value: {},
                    rules: [],
                },
                paid: {
                    value: {},
                    rules: [],
                },
            };
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

        if (typeof this.data !== 'undefined' && typeof this.data.id !== 'undefined') {
            id = this.data.id;
        } else {
            id = 'temp_' + timestampService.generateUnixId();
        }

        return {
            type,
            data: { ...data, id },
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
}

export default BudgetTemplateForm;
