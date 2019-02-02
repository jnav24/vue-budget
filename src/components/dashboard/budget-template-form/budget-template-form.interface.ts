import {BudgetListAddInterface} from '@/interfaces/buget-list-add.interface';
import {FormInterface} from '@/interfaces/form.interface';

export interface BudgetTemplateFormInterface {
    form: FormInterface;
    setData(): BudgetListAddInterface;
    setupForm(): void;
    validateForm(obj: { valid: boolean }): void;
}
