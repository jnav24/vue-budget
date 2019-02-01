import { Vue, Prop, Emit } from 'vue-property-decorator';

abstract class Dialogs extends Vue {
    @Prop() public data: any;
    @Prop() private dialog: any;

    public get currentData() {
        return this.data;
    }

    public get showDialog() {
        return this.dialog;
    }

    public set showDialog(val: boolean) {
        this.updateDialog(val);
    }

    public closeDialog() {
        this.updateDialog(false);
    }

    @Emit('updateDialog')
    private updateDialog(dialog: boolean) {
        // ...
    }
}

export default Dialogs;
