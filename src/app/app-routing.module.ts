import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContributionListComponent} from './contribution-list/contribution-list.component';
import {AuthCallbackComponent} from './auth-callback/auth-callback.component';
import {LoginComponent} from './login/login.component';
import {AuthGuardService} from './auth-guard.service';
import {CommentListComponent} from './comment-list/comment-list.component';

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'auth/callback', component: AuthCallbackComponent},
    {path: '', redirectTo: '/news', pathMatch: 'full', canActivate: [AuthGuardService]},
    {path: 'news', component: ContributionListComponent, canActivate: [AuthGuardService]},
    {path: 'newest', component: ContributionListComponent, canActivate: [AuthGuardService]},
    {path: 'ask', component: ContributionListComponent, canActivate: [AuthGuardService]},
    {path: 'comments/:username', component: CommentListComponent, canActivate: [AuthGuardService]}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
