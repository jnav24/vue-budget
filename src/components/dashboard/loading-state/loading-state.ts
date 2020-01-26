import { Vue, Component } from 'vue-property-decorator';

@Component
export default class LoadingState extends Vue {
    public showMessage: boolean = false;

    public created() {
        setTimeout(() => {
            this.showMessage = true;
        }, 30000);
    }
}
