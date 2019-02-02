import {Emit, Prop, Vue, Component} from 'vue-property-decorator';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {ResponseInterface} from '@/interfaces/response.interface';
import {Action} from 'vuex-class';

Component.registerHooks([
    'mounted',
]);

@Component
class BudgetTemplateForm extends Vue {
    @Prop() public data: any;
    @Prop() public dialog: any;
    @Action public appendBudgetTemplate: (obj: BudgetListAddInterface) => Promise<ResponseInterface>;
    protected resetForm: boolean = false;
    protected templateValid: boolean = false;

    public mounted() {
        if (this.dialog) {
            this.setupForm();
        }
    }

    @Emit('submitForm')
    protected closeForm() {
        // ...
    }

    protected setupForm() {
        // ....
    }

    protected submit(data: BudgetListAddInterface) {
        if (this.templateValid) {
            this.appendBudgetTemplate(data)
                .then((res: ResponseInterface) => {
                    if (res.success) {
                        this.closeForm();
                        this.resetForm = true;
                    }
                });
        } else {
            this.closeForm();
            this.resetForm = true;
        }
    }
}

export default BudgetTemplateForm;
