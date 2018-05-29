import {Owner} from './contribution';

export class Comment {
    deleted: boolean;
    totalLikes: number;
    date: string;
    id: string;
    comment: string;
    owner: Owner;
    post: string;
    parentComment: string;
    replies: Comment[];

    constructor() {

    }
}
