import {Component, OnInit} from '@angular/core';
import {APIService} from '../api.service';
import {SubmitPostComponent} from '../submit-post/submit-post.component';
import {MatDialog} from '@angular/material';
import {ProfileComponent} from '../profile/profile.component';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

    currentUser = this.apiService.currentUser;

    constructor(private dialog: MatDialog, private apiService: APIService) {
    }

    ngOnInit() {
    }

    openProfile(data) {
        this.dialog.open(ProfileComponent, {
            width: '75%',
            panelClass: 'profile-dialog',
            data
        });
    }
}
