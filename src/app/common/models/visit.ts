import { Customer } from './customer';
import { SalesRepresentative } from './salesRepresentative';

export class Visit {
    id?: number;
    date: Date;
    net: number;
    visitTotal: number;
    description: string;
    customer: Customer;
    salesRepresentative: SalesRepresentative;

    constructor(){
       this.id = undefined;
    }
}