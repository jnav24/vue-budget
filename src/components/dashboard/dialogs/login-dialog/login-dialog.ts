import { Component } from 'vue-property-decorator';
import Dialogs from '@/components/dashboard/dialogs/dialogs';
import {FormInterface} from '@/interfaces/form.interface';
import {validateService} from '@/module';

@Component
export default class LoginDialog extends Dialogs {
    public form: FormInterface = {
        password: {
            value: '',
            rules: [
                (v: any) => !!v || 'Password is required',
                (v: any) => validateService.isValidLength(v) || 'Password is not long enough',
                (v: any) => validateService.isUppercasePresent(v) || 'Password must contain uppercase letters',
                (v: any) => validateService.isLowercasePresent(v) || 'Password must contain lowercase letters',
                (v: any) => validateService.isNumberPresent(v) || 'Password must contain numbers',
                (v: any) => validateService.hasSpecialCharacters(v) ||
                    'Password must contain at least one of the following special character (!$#%)',
            ],
        },
    };
    public loginDialogValid: boolean = false;
}
