import {Contribution, Owner} from './contribution';

export class UrlContribution extends Contribution {

    url: string;
    tld: string;

    constructor(_title: string, _totalComments: number, _totalLikes: number, _date: string, _id: string, _owner: Owner, _comments: Comment[],
                _url: string, _tld: string) {
        super(_title, _totalComments, _totalLikes, _date, _id, _owner, _comments);
        this.url = _url;
        this.tld = _tld;
    }
}