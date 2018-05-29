export class Owner {
    public id: string;
    public username: string;

    constructor(_id: string, _username: string) {
        this.id = _id;
        this.username = _username;
    }
}

export abstract class Contribution {
    title: string;
    totalComments: number;
    totalLikes: number;
    date: string;
    id: string;
    owner: Owner;
    comments: Comment[];

    protected constructor(_title: string, _totalComments: number, _totalLikes: number, _date: string, _id: string, _owner: Owner, _comments: Comment[]) {
        this.title = _title;
        this.totalComments = _totalComments;
        this.totalLikes = _totalLikes;
        this.date = _date;
        this.id = _id;
        this.owner = _owner;
        this.comments = _comments;
    }

}
