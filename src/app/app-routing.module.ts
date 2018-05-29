import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContributionListComponent} from './contribution-list/contribution-list.component';

const routes: Routes = [
    {path: '', redirectTo: '/news', pathMatch: 'full'},
    {path: 'news', component: ContributionListComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
