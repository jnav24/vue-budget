import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
class SaveControls extends Vue {
    @Prop({ default: false }) public canSave: boolean;

    @Emit('buttonClicked')
    public buttonClicked(bool: boolean) {
        // ...
    }
}

export default SaveControls;
