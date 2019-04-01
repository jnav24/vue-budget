import { Component } from 'vue-property-decorator';
import Budgets from '@/components/dashboard/budgets/budgets';
import {RootStateInterface} from '@/interfaces/root-state.interface';
import {State} from 'vuex-class';
import {UserStateInterface} from '@/interfaces/user-state.interface';
import {UserVehicleInterface} from '@/interfaces/user-vehicle.interface';

@Component
export default class Vehicles extends Budgets {
    @State((state: RootStateInterface) => state.User) public userState: UserStateInterface;

    public mounted() {
        this.type = 'vehicles';
        this.getTypeId();
    }

    public get vehicles() {
        return this.userState.vehicles;
    }

    public getVehicle(id: number): string {
        const index = this.vehicles.findIndex((obj: UserVehicleInterface) => obj.id === id);

        if (index > -1) {
            return `${this.vehicles[index].year} ${this.vehicles[index].make} ${this.vehicles[index].model}`;
        }

        return 'Vehicle not found';
    }
}
