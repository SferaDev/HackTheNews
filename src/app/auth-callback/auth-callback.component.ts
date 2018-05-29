import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {APIService} from '../api.service';

@Component({
    selector: 'app-auth-callback',
    templateUrl: './auth-callback.component.html',
    styleUrls: ['./auth-callback.component.css']
})

export class AuthCallbackComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute, private apiService: APIService) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.apiService.auth(params['code'], () => this.router.navigateByUrl('/'));
        });
    }

}
