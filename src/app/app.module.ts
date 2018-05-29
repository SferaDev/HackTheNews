import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatToolbarModule, MatListModule, MatIconModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {ToolbarceComponent} from './toolbarce/toolbarce.component';
import {AppRoutingModule} from './app-routing.module';
import {ContributionListComponent} from './contribution-list/contribution-list.component';
import {ContributionComponent} from './contribution/contribution.component';

@NgModule({
    declarations: [
        AppComponent,
        ToolbarceComponent,
        ContributionListComponent,
        ContributionComponent
    ],
    imports: [
        BrowserModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
