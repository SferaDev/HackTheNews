import {Component, Inject, OnInit} from '@angular/core';
import {Contribution, Owner} from '../../models/contribution';
import {MAT_DIALOG_DATA, MatIconRegistry} from '@angular/material';
import {APIService} from '../api.service';
import {Comment} from '../../models/comment';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-contribution-detail',
    templateUrl: './contribution-detail.component.html',
    styleUrls: ['./contribution-detail.component.scss']
})
export class ContributionDetailComponent implements OnInit {
    contribution: Contribution;
    canRender = false;
    currentUsername: String;

    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private apiService: APIService,
                private route: ActivatedRoute, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any) {
        iconRegistry.addSvgIcon('thumbs-up',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/outline-thumb_up.svg'));
        iconRegistry.addSvgIcon('thumbs-down',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/filled-thumb_up.svg'));
        iconRegistry.addSvgIcon('three-dots',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/three-dots.svg'));

        route.params.subscribe(() => {
            this.ngOnInit();
        });
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.route.params.subscribe(params => {
            this.getContribution(this.data._id).subscribe((contrib: Contribution) => {
                this.contribution = contrib;
                this.canRender = true;
                this.currentUsername = this.apiService.currentUser.username;
            });
        });
    }

    getContribution(id: string) {
        const endpoint = '/posts/' + id;
        return this.apiService.get(endpoint);
    }

    getContributionLikedByMe(): boolean {
        return this.contribution.likes.some(l => l.owner.username === this.apiService.currentUser.username);
    }

    getCommentLikedByMe(comment: Comment): boolean {
        return comment.likes.some(l => l.owner.username === this.apiService.currentUser.username);
    }

    likeContribution(id: string) {
        const endpoint = '/posts/' + id + '/like';
        this.apiService.post(endpoint, '').subscribe(() => {
            /**this.contribution.likes.push({
                owner: new Owner(
                    this.apiService.currentUser._id,
                    this.apiService.currentUser.username,
                    this.apiService.currentUser.picture
                )
            });
            this.contribution.totalLikes += 1;**/
            this.refresh();
        });
    }

    dislikeContribution(id: string) {
        const endpoint = '/posts/' + id + '/like';
        this.apiService.delete(endpoint).subscribe(() => {
            /**this.contribution.likes.splice(this.contribution.likes.findIndex(
                l => l.owner.username === this.apiService.currentUser.username,
                1));
            this.contribution.totalLikes -= 1;**/
            this.refresh();
        });
    }

    likeComment(id: string) {
        const endpoint = '/comments/' + id + '/like';
        this.apiService.post(endpoint, '').subscribe(() => {
            /**const index = this.contribution.comments.findIndex(c => c._id === id);
            this.contribution.comments[index].likes.push({
                owner: new Owner(
                    this.apiService.currentUser._id,
                    this.apiService.currentUser.username,
                    this.apiService.currentUser.picture
                )
            });
            this.contribution.comments[index].totalLikes += 1;**/
            this.refresh();
        });
    }

    dislikeComment(id: string) {
        const endpoint = '/comments/' + id + '/like';
        this.apiService.delete(endpoint).subscribe(() => {
            /**const index = this.contribution.comments.findIndex(c => c._id === id);
            this.contribution.comments[index].likes.splice(
                this.contribution.comments[index].likes.findIndex(l => l._id === id), 1);
            this.contribution.comments[index].totalLikes -= 1;**/
            this.refresh();
        });
    }

    handleContributionLike() {
        this.getContributionLikedByMe() ? this.dislikeContribution(this.contribution._id) : this.likeContribution(this.contribution._id);
    }

    handleCommentLike(comment: Comment) {
        this.getCommentLikedByMe(comment) ? this.dislikeComment(comment._id) : this.likeComment(comment._id);
    }

    addComment(text: string, parent: string): void {
        if (text === '') { return; }
        const endpoint = '/posts/' + this.contribution._id + '/comment';
        this.apiService.post(endpoint, {comment: text, parentComment: parent === undefined ? '' : parent}).subscribe(() => {
            /**this.getContribution(this.contribution._id).subscribe((contrib: Contribution) => {
                this.contribution = contrib;
            });**/
            this.refresh();
        });
    }

    deleteComment(comment: Comment) {
        const endpoint = '/comments/' + comment._id;
        this.apiService.delete(endpoint).subscribe(() => {
            // comment.comment = '<deleted>';
            this.refresh();
        });
    }

    editComment(comment: Comment) {
        const text = prompt('Edit comment', comment.comment);
        const endpoint = '/comments/' + comment._id;
        this.apiService.put(endpoint, {comment: text}).subscribe(() => {
            // comment.comment = text;
            this.refresh();
        });
    }

    replyToComment(comment: Comment) {
        const text = prompt('Reply to comment', comment.comment);
        this.addComment(text, comment._id);
    }
}
