import { Visit } from './visit';
import { City } from './city';
import { State } from './state';
import { Country } from './country';

export class Customer {
    id?: number;
    nit: string;
    fullName: string;
    address: string;
    phone: number;
    creditLimit: number;
    availableCredit: number;
    visitsPercentage: number;
    country: Country;
    state: State;
    city: City;
    visits?: Visit[];

    constructor(){
       this.id = undefined;
    }
}