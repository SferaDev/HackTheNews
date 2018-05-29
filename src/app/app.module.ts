import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSnackBarModule,
    MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {TimeAgoPipe} from 'time-ago-pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {AppRoutingModule} from './app-routing.module';
import {ContributionListComponent} from './contribution-list/contribution-list.component';
import {AuthCallbackComponent} from './auth-callback/auth-callback.component';
import {LoginComponent} from './login/login.component';
import {SubmitPostComponent} from './submit-post/submit-post.component';
import { ContributionDetailComponent } from './contribution-detail/contribution-detail.component';
import { ProfileComponent } from './profile/profile.component'
import {FlexLayoutModule} from '@angular/flex-layout';
import { CommentListComponent } from './comment-list/comment-list.component';


@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        AuthCallbackComponent,
        TimeAgoPipe,
        LoginComponent,
        SubmitPostComponent,
        ContributionListComponent,
        ContributionDetailComponent,
        ProfileComponent,
        CommentListComponent
    ],
    imports: [
        BrowserModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        AppRoutingModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatMenuModule,
        MatExpansionModule,
        MatCardModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatBadgeModule,
        FlexLayoutModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [
        SubmitPostComponent,
        ContributionDetailComponent,
        ProfileComponent
    ]
})
export class AppModule {

}
