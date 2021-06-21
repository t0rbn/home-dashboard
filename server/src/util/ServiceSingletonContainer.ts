import {Service} from "../services/Service";

export default class ServiceSingletonContainer {

    private static services = new Map<string, Service>();

    public static registerService(service: Service): void {
        this.services.set(service.constructor.name, service);
    }

    public static getService(service: any): typeof service {
        return this.services.get(service.name) as typeof service || null;
    }

    public static getAllServices(): Service[] {
        return Array.from(this.services.values());
    }

}
