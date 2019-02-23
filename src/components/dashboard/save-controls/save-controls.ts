import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import {SaveControlsInterface} from '@/interfaces/save-controls.interface';

@Component
class SaveControls extends Vue {
    @Prop({ default: false }) public canSave: boolean;

    @Emit('buttonClicked')
    public buttonClicked(obj: SaveControlsInterface) {
        // ...
    }
}

export default SaveControls;
