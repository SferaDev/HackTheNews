import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {User} from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class APIService {
    private httpClient: HttpClient;
    private apiKey = environment.apiKey || localStorage.getItem('apiKey');
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    private apiBaseUrl = 'https://news4hackers.herokuapp.com/api';

    constructor(httpClient: HttpClient) {
        this.httpClient = httpClient;

        this.refresh();
    }

    refresh() {
        if (this.apiKey !== undefined && this.apiKey !== null) {
            localStorage.setItem('apiKey', this.apiKey);
            this.get('/').subscribe((user: User) => {
                this.currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(user));
            });
        }
    }

    auth(oauthToken: string, next) {
        this.httpClient.post(this.apiBaseUrl, {oauthToken: oauthToken}).subscribe(data => {
            this.apiKey = data['apiKey'];
            localStorage.setItem('apiKey', data['apiKey']);
            this.get('/').subscribe((user: User) => {
                this.currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(user));
                next();
            });
        });
    }

    get(endpoint: string): Observable<Object> {
        return this.httpClient.get(this.apiBaseUrl + endpoint, this.buildOptions());
    }

    post(endpoint: string, data): Observable<Object> {
        return this.httpClient.post(this.apiBaseUrl + endpoint, data, this.buildOptions());
    }

    put(endpoint: string, data): Observable<Object> {
        return this.httpClient.put(this.apiBaseUrl + endpoint, data, this.buildOptions());
    }

    delete(endpoint: string): Observable<Object> {
        return this.httpClient.delete(this.apiBaseUrl + endpoint, this.buildOptions());
    }

    isLoggedIn() {
        return this.apiKey !== undefined && this.apiKey !== null;
    }

    private buildOptions() {
        return {
            headers: new HttpHeaders(this.apiKey !== undefined ? {'X-API-Key': this.apiKey} : '')
        };
    }
}
