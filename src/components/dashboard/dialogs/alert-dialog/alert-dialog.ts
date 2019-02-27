import {Component, Prop, Watch} from 'vue-property-decorator';
import Dialogs from '@/components/dashboard/dialogs/dialogs';

@Component
class AlertDialog extends Dialogs {
    @Prop({ default: 3000}) public duration: number;

    @Watch('dialog')
    private watchDialog() {
        if (this.showDialog) {
            setTimeout(() => {
                this.updateDialog(false);
            }, this.duration);
        }
    }
}

export default AlertDialog;
