import {Emit, Prop, Vue, Component} from 'vue-property-decorator';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {Mutation, State} from 'vuex-class';
import {TypesStateInterface} from '@/interfaces/types-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';

Component.registerHooks([
    'mounted',
]);

@Component
class BudgetTemplateForm extends Vue {
    @Prop() public data: any;
    @Prop() public dialog: any;
    @Mutation public addBudgetTemplate: (obj: BudgetListAddInterface) => void;
    @State((state: RootStateInterface) => state.Types) public typesState: TypesStateInterface;
    public editMode: boolean = false;
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
            this.addBudgetTemplate(data);
            this.closeForm();
            this.editMode = false;
            this.resetForm = true;
        } else {
            this.closeForm();
            this.editMode = false;
            this.resetForm = true;
        }
    }
}

export default BudgetTemplateForm;
