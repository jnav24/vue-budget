import {Emit, Prop, Vue, Component} from 'vue-property-decorator';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {State} from 'vuex-class';
import {TypesStateInterface} from '@/interfaces/types-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {timestampService} from '@/module';
import {FormInterface} from '@/interfaces/form.interface';
import {UserStateInterface} from '@/store/modules/user/user-state.interface';

Component.registerHooks([
    'created',
    'mounted',
]);

@Component
class BudgetTemplateForm extends Vue {
    @Prop({ default: timestampService.getCurrentTimestamp('UTC', 'YYYY-MM-DD') }) public cycle: string;
    @Prop() public data: any;
    @Prop() public dialog: boolean;
    @Prop({ default: false }) public showPaidForm: boolean;
    @State((state: RootStateInterface) => state.User) public userState: UserStateInterface;
    @State((state: RootStateInterface) => state.Types) public typesState: TypesStateInterface;
    public dates = Array.from(Array(31).keys()).map((num: any) => num + 1);
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
                    value: timestampService.getCurrentTimestamp('UTC', 'YYYY-MM-DD hh:mm:ss'),
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
            id = timestampService.generateTempId();
        }

        if (this.showPaidForm) {
            paid = {
                confirmation: this.form.confirmation.value,
                paid_date: this.form.paid.value,
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
            let paid = this.data.paid_date;

            if (
                this.data.paid_date === null ||
                typeof this.data.paid_date === 'undefined' ||
                this.data.paid_date.trim() === ''
            ) {
                let day: string = this.data.due_date;
                const actualEndDay: string = timestampService.getEndDayOfMonth(this.cycle, 'D');

                if (Number(day) > Number(actualEndDay)) {
                    day = actualEndDay;
                }

                paid = `${timestampService.format(this.cycle, 'YYYY')}-`;
                paid += `${timestampService.format(this.cycle, 'MM')}-${day}`;
            }

            this.form.paid.value = paid;
            this.form.confirmation.value = this.data.confirmation;
        }
    }
}

export default BudgetTemplateForm;
