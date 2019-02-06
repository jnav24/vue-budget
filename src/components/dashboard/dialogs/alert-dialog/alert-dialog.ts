import { Component, Watch } from 'vue-property-decorator';
import Dialogs from '@/components/dashboard/dialogs/dialogs';

@Component
class AlertDialog extends Dialogs {
    @Watch('dialog')
    private watchDialog() {
        if (this.showDialog) {
            setTimeout(() => {
                this.updateDialog(false);
            }, 5000);
        }
    }
}

export default AlertDialog;
