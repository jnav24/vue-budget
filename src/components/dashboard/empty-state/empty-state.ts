import { Vue, Component, Emit, Prop } from 'vue-property-decorator';

@Component
class EmptyState extends Vue {
    @Prop({ default: false }) public disableButton: boolean;
    @Prop() public text: string;
    @Prop() public buttonText: string;

    @Emit('buttonClicked')
    public emitButtonClick() {
        // ...
    }

    public get isDisabled() {
        return this.disableButton;
    }
}

export default EmptyState;
