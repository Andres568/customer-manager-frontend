import { State } from './state';

export class Country {
    id?: number;
    isEnable: string;
    name: string;
    city: string;
    imageUrl: string;
    states?: State[];

    constructor() {
       this.id = undefined;
    }
}
