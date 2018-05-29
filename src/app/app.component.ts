import {Component} from '@angular/core';
import {SubmitPostComponent} from './submit-post/submit-post.component';
import {MatDialog} from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    constructor() {
    }
}
