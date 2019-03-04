import {Component, Emit, Prop} from 'vue-property-decorator';
import Dialogs from '@/components/dashboard/dialogs/dialogs';

@Component
class ConfirmDialog extends Dialogs {
    @Prop({ default: 'Cancel' }) public cancelText: string;
    @Prop({ default: 'danger' }) public iconColor: string;
    @Prop({ default: 'error_outline' }) public iconType: string;
    @Prop({ default: 'Are you sure?' }) public message: string;
    @Prop({ default: 'danger' }) public submitColor: string;
    @Prop({ default: 'Confirm' }) public submitText: string;

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
