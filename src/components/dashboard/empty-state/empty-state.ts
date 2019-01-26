import { Vue, Component, Emit, Prop } from 'vue-property-decorator';

@Component
class EmptyState extends Vue {
    @Prop() public text: string;
    @Prop() public buttonText: string;

    @Emit('buttonClicked')
    public emitButtonClick() {
        // ...
    }
}

export default EmptyState;
