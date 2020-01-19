import { Component } from 'vue-property-decorator';
import List from '@/components/dashboard/lists/list';
import {Getter} from 'vuex-class';

@Component
export default class VehicleList extends List {
    @Getter public userVehicles: Array<{ value: string; label: string}>;

    public getSelectedVehicle(id: string): string {
        const vehicle = this.userVehicles.find((obj: { value: string; label: string}) => obj.value === id);
        return !!vehicle && !!vehicle.label ? vehicle.label : '';
    }
}
