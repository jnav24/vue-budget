import { Component } from 'vue-property-decorator';
import Dialogs from '@/components/dashboard/dialogs/dialogs';
import {FormInterface} from '@/interfaces/form.interface';
import {validateService} from '@/module';
import {ResponseInterface} from '@/interfaces/response.interface';
import {Action, State} from 'vuex-class';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {BudgetTemplateStateInterface} from '@/interfaces/budget-template-state.interface';

@Component
class AddBudgetDialog extends Dialogs {
    @Action public saveBudget: (obj: { name: string; expenses: any }) => Promise<ResponseInterface>;
    @State((state: RootStateInterface) => state.BudgetTemplates) public budgetTemplates: BudgetTemplateStateInterface;
    public addBudgetValid: boolean = false;
    public form: FormInterface = {
        name: {
            value: '',
            rules: [
                (v: any) => !!v || 'Budget name is required',
                (v: any) => validateService.isValidLength(v, 3) || 'Budget name must be at least 3 characters long',
            ],
        },
    };

    public addBudget() {
        if (this.addBudgetValid) {
            const data = {
                name: this.form.name.value,
                expenses: this.budgetTemplates.templates.expenses,
            };

            this.saveBudget(data)
                .then((res: ResponseInterface) => {
                    if (res.success) {
                        this.closeDialog();
                        const ref: any = this.$refs.addBudgetForm;
                        ref.reset();
                        this.$router.push({ name: 'budget-edit', params: { id: res.data.id } });
                    }
                });
        }
    }
}

export default AddBudgetDialog;
