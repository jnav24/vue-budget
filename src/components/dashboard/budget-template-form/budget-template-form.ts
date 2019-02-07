import {Emit, Prop, Vue, Component} from 'vue-property-decorator';
import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {Mutation, State} from 'vuex-class';
import {TypesStateInterface} from '@/interfaces/types-state.interface';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {timestampService} from '@/module';

Component.registerHooks([
    'mounted',
]);

@Component
class BudgetTemplateForm extends Vue {
    @Prop() public data: any;
    @Prop() public dialog: any;
    @Mutation public addBudgetTemplate: (obj: BudgetListAddInterface) => void;
    @Mutation public updateBudgetTemplate: (obj: BudgetListAddInterface) => void;
    @Mutation public updateCanSave: (bool: boolean) => void;
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
            this.updateCanSave(true);
            this.closeForm();
            this.editMode = false;
            this.resetForm = true;
        } else {
            this.closeForm();
            this.editMode = false;
            this.resetForm = true;
        }
    }

    protected updateSubmit(data: BudgetListAddInterface) {
        if (this.templateValid) {
            this.updateBudgetTemplate(data);
            this.updateCanSave(true);
            this.closeForm();
            this.editMode = false;
            this.resetForm = true;
        } else {
            this.closeForm();
            this.editMode = false;
            this.resetForm = true;
        }
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
}

export default BudgetTemplateForm;
