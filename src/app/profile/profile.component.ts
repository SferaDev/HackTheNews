import {Component, Inject, OnInit} from '@angular/core';
import {APIService} from '../api.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material';
import {User} from '../../models/user';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    currentUser = this.apiService.currentUser;
    userToDisplay: User;
    usernameToDiplay: string;
    canRender: boolean;

    constructor(private apiService: APIService, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) {
        this.usernameToDiplay = data.username;
        this.canRender = false;
    }

    ngOnInit() {
        this.apiService.refresh();
        this.apiService.get('/users/' + this.usernameToDiplay).subscribe((user: User) => {
            this.userToDisplay = user;
            this.canRender = true;
        });
    }

    updateAbout(text) {
        const endpoint = '/users/' + this.data.username;
        this.apiService.put(endpoint, {about: text}).subscribe(() => {
            this.apiService.refresh();
        });
    }

    showThreads(username: string) {
        this.router.navigate(['/comments/' + username]);
    }
}
