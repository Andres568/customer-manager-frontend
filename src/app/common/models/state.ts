import { City } from './city';

export class State {
    id?: number;
    name: string;
    cities?: City[];

    constructor(){
       this.id = undefined;
    }
}
