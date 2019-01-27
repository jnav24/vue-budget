import {Component, Emit} from 'vue-property-decorator';
import Dialogs from '@/components/dashboard/dialogs/dialogs';

@Component
class ConfirmDialog extends Dialogs {
    public hasButtonText(): boolean {
        return typeof this.data !== 'undefined' &&
            typeof this.data.button !== 'undefined' &&
            typeof this.data.button.color !== 'undefined' &&
            typeof this.data.button.text !== 'undefined' &&
            this.data.button.color.trim() !== '' &&
            this.data.button.text.trim() !== '';
    }

    public hasButtonCancel(): boolean {
        return typeof this.data !== 'undefined' &&
            typeof this.data.button !== 'undefined' &&
            typeof this.data.button.cancel !== 'undefined' &&
            this.data.button.cancel.trim() !== '';
    }

    public hasIcon(): boolean {
        return typeof this.data !== 'undefined' &&
            typeof this.data.icon !== 'undefined' &&
            typeof this.data.icon.text !== 'undefined' &&
            typeof this.data.icon.color !== 'undefined' &&
            this.data.icon.text.trim() !== '' &&
            this.data.icon.color.trim() !== '';
    }

    public hasText(): boolean {
        return typeof this.data !== 'undefined' &&
            typeof this.data.text !== 'undefined' &&
            this.data.text.trim() !== '';
    }

    public submitDialog(val: number = 0) {
        this.updateData(val);
        this.closeDialog();
    }

    @Emit('updateData')
    private updateData(val: number) {
        // ...
    }
}

export default ConfirmDialog;
