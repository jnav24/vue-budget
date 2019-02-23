import {Component, Emit} from 'vue-property-decorator';
import Dialogs from '@/components/dashboard/dialogs/dialogs';

@Component
class ConfirmDialog extends Dialogs {
    public hasButtonText(): boolean {
        return typeof this.currentData !== 'undefined' &&
            typeof this.currentData.button !== 'undefined' &&
            typeof this.currentData.button.color !== 'undefined' &&
            typeof this.currentData.button.text !== 'undefined' &&
            this.currentData.button.color.trim() !== '' &&
            this.currentData.button.text.trim() !== '';
    }

    public hasButtonCancel(): boolean {
        return typeof this.currentData !== 'undefined' &&
            typeof this.currentData.button !== 'undefined' &&
            typeof this.currentData.button.cancel !== 'undefined' &&
            this.currentData.button.cancel.trim() !== '';
    }

    public hasIcon(): boolean {
        return typeof this.currentData !== 'undefined' &&
            typeof this.currentData.icon !== 'undefined' &&
            typeof this.currentData.icon.text !== 'undefined' &&
            typeof this.currentData.icon.color !== 'undefined' &&
            this.currentData.icon.text.trim() !== '' &&
            this.currentData.icon.color.trim() !== '';
    }

    public hasText(): boolean {
        return typeof this.currentData !== 'undefined' &&
            typeof this.currentData.text !== 'undefined' &&
            this.currentData.text.trim() !== '';
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
