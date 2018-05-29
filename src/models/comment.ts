import {Owner} from './contribution';

export class Comment {
    deleted: boolean;
    totalLikes: number;
    date: string;
    _id: string;
    comment: string;
    owner: Owner;
    post: string;
    parentComment: string;
    replies: this[];
    likes = [];

    constructor() {

    }
}
