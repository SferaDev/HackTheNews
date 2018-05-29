import {Comment} from './comment';

export class Owner {
    public id: string;
    public username: string;
    public picture: string;

    constructor(_id: string, _username: string, _picture: string) {
        this.id = _id;
        this.username = _username;
        this.picture = _picture;
    }
}

export abstract class Contribution {
    title: string;
    totalComments: number;
    totalLikes: number;
    date: string;
    _id: string;
    owner: Owner;
    comments: Comment[];
    likes = [];

    protected constructor() {

    }

}
