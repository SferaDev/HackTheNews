import {Component, OnInit} from '@angular/core';
import {APIService} from '../api.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    constructor(private apiService: APIService, private router: Router) {
    }

    ngOnInit() {
        if (this.apiService.isLoggedIn()) {
            this.router.navigate(['news']);
        }
    }
}
