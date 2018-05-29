import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {APIService} from './api.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private apiService: APIService, private router: Router) {
    }

    canActivate(): boolean {
        if (!this.apiService.isLoggedIn()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
