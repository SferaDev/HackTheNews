import { Component, OnInit } from '@angular/core';
import {AskContribution} from '../../models/ask-contribution';
import {MatDialog, MatIconRegistry} from '@angular/material';
import {ProfileComponent} from '../profile/profile.component';
import {ContributionDetailComponent} from '../contribution-detail/contribution-detail.component';
import {APIService} from '../api.service';
import {UrlContribution} from '../../models/url-contribution';
import {SubmitPostComponent} from '../submit-post/submit-post.component';
import {Contribution} from '../../models/contribution';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
    contributions: Comment[] = [];
    currentUsername: string;
    canRender = false;

    constructor(private dialog: MatDialog, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
                private apiService: APIService, private router: Router, private route: ActivatedRoute) {
        if (!apiService.isLoggedIn()) {
            this.router.navigate(['news']);
        }

        iconRegistry.addSvgIcon('thumbs-up',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/outline-thumb_up.svg'));
        iconRegistry.addSvgIcon('thumbs-down',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/filled-thumb_up.svg'));
        iconRegistry.addSvgIcon('three-dots',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/three-dots.svg'));
    }

    ngOnInit() {
        this.refresh();
    }

    refresh() {
        this.route.params.subscribe((params) => {
            const endpoint = '/users/' + params['username'] + '/comments';
            this.apiService.get(endpoint).subscribe((contribs: Comment[]) => {
              console.log(contribs);
                this.contributions = contribs;
                this.canRender = true;
                this.currentUsername = this.apiService.currentUser.username;
            });
        });
    }

    getUrlContributions() {
        const endpoint = '/posts/url';
        return this.apiService.get(endpoint);
    }

    getContributions() {
        const endpoint = '/posts';
        return this.apiService.get(endpoint);
    }

    getAskContributions() {
        const endpoint = '/posts/ask';
        return this.apiService.get(endpoint);
    }

    getLikedByMe(contribution: Contribution): boolean {
        return contribution.likes.some(l => l.owner.username === this.apiService.currentUser.username);
    }

    likeContribution(id: string) {
        const endpoint = '/posts/' + id + '/like';
        this.apiService.post(endpoint, '').subscribe(() => {
            /**this.contributions.find(c => c._id === id).likes.push({
                owner: new Owner(
                    this.apiService.currentUser._id,
                    this.apiService.currentUser.username,
                    this.apiService.currentUser.picture
                )
            });
             this.contributions.find(c => c._id === id).totalLikes += 1;**/
            this.apiService.currentUser.karma += 1;
            this.refresh();
        });
    }

    dislikeContribution(id: string) {
        const endpoint = '/posts/' + id + '/like';
        this.apiService.delete(endpoint).subscribe(() => {
            /**const contrib = this.contributions.find(c => c._id === id);
             contrib.likes.splice(contrib.likes.findIndex(l => l.owner.username === this.apiService.currentUser.username),
             1);
             this.contributions.find(c => c._id === id).totalLikes -= 1;**/
            this.apiService.currentUser.karma -= 1;
            this.refresh();
        });
    }

    handleLike(contribution: Contribution) {
        this.getLikedByMe(contribution) ? this.dislikeContribution(contribution._id) :
            this.likeContribution(contribution._id);
    }

    viewContribution(contribution: Contribution) {
        (contribution as UrlContribution).url === undefined ?
            this.viewComments(contribution) :
            window.location.href = (contribution as UrlContribution).url;
    }

    editContribution(contribution: Contribution) {
        const postTitle = prompt('Edit contribution title', contribution.title);
        const endpoint = '/posts/' + contribution._id;
        if ((contribution as UrlContribution).url === undefined) {
            const postText = prompt('Edit contribution text', (contribution as AskContribution).text);
            this.apiService.put(endpoint, {title: postTitle, text: postText}).subscribe(() => {
                this.refresh();
                // contribution.title = postTitle;
                // (contribution as AskContribution).text = postText;
            });
        } else {
            const postUrl = prompt('Edit contribution text', (contribution as UrlContribution).url);
            this.apiService.put(endpoint, {title: postTitle, url: postUrl}).subscribe(() => {
                this.refresh();
                // contribution.title = postTitle;
                // (contribution as UrlContribution).url = postUrl;
            });
        }
    }

    deleteContribution(contribution: Contribution) {
        const endpoint = '/posts/' + contribution._id;
        this.apiService.delete(endpoint).subscribe(() => {
            this.refresh();
            // this.contributions.splice(this.contributions.findIndex(c => c === contribution), 1);
        });
    }

    private viewComments(data: Contribution) {
        this.dialog.open(ContributionDetailComponent, {
            width: '75%',
            panelClass: 'contribution-details-dialog',
            data
        });
    }

    onNewMessage(): void {
        const submitDialog = this.dialog.open(SubmitPostComponent, {
            width: '75%',
            panelClass: 'submit-post-dialog',
        });

        submitDialog.afterClosed().subscribe(() => {
            this.refresh();
        });
    }

    openProfile(data) {
        this.dialog.open(ProfileComponent, {
            width: '75%',
            panelClass: 'profile-dialog',
            data
        });
    }
}
