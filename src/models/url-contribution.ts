import {Contribution} from './contribution';

export class UrlContribution extends Contribution {
    url: string;
    tld: string;

    constructor() {
        super();
    }
}