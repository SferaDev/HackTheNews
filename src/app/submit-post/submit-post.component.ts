import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {APIService} from '../api.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-submit-post',
    templateUrl: './submit-post.component.html',
    styleUrls: ['./submit-post.component.scss']
})
export class SubmitPostComponent implements OnInit {

    constructor(private snackBar: MatSnackBar, private apiService: APIService,
                private router: Router) {
    }

    ngOnInit() {
    }

    addPost(title: string, url: string, text: string) {
        if (title === '' || title === undefined) {
            this.snackBar.open('You must enter a title!', null, {
                duration: 2000
            });
        } else if (url !== '' && text !== '') {
            this.snackBar.open('You can not enter text and url at the same time!', null, {
                duration: 2000
            });
        } else {
            if (url === '' || url === undefined) {
                this.apiService.post('/posts/ask', {title: title, text: text}).subscribe((response) => {
                    this.router.navigate(['/item/', response['message']]);
                });
            } else {
                this.apiService.post('/posts/url', {title: title, url: url}).subscribe((response) => {
                    this.router.navigate(['/item/', response['message']]);
                });
            }
            this.snackBar.open('Post created!', null, {
                duration: 2000
            });
        }
    }

}
