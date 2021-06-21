import {IPSODevice} from "node-tradfri-client";


export default class IPSODeviceUsageSorter<T extends IPSODevice> {

    private entities: Map<number, number> = new Map();

    public registerUsage(instanceId: number): void {
        let current = this.getUsages(instanceId)
        this.entities.set(instanceId, current + 1);
    }

    private getUsages(instanceId: number): number {
        return this.entities.get(instanceId) || 0;
    }

    public sort(devices: Array<T>): Array<T> {
        return devices.sort((a, b) => {
            if (this.getUsages(a.instanceId) !== this.getUsages(b.instanceId)) {
                return this.getUsages(a.instanceId) < this.getUsages(b.instanceId) ? 1 : -1
            }
            if (a.name !== b.name) {
                return a.name > b.name ? 1 : -1
            }
            return 0
        })
    }

}
