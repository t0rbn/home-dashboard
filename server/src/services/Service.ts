import {Application} from 'express';

export interface Service {

    registerEndpoints(app: Application): void;

}
