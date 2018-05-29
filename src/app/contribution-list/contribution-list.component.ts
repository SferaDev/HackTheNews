import {Component, OnInit} from '@angular/core';
import {ContributionComponent} from '../contribution/contribution.component';
import {UrlContribution} from '../contribution/url-contribution';
import {Contribution, Owner} from '../contribution/contribution';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
    selector: 'app-contribution-list',
    templateUrl: './contribution-list.component.html',
    styleUrls: ['./contribution-list.component.css']
})
export class ContributionListComponent implements OnInit {

    private contributions = [];


    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry.addSvgIcon('thumbs-up',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/outline-thumb_up.svg'));
        iconRegistry.addSvgIcon('thumbs-down',
            sanitizer.bypassSecurityTrustResourceUrl('assets/img/filled-thumb_up.svg'));

        this.contributions.push(new UrlContribution('Bamboozled by Pol Moya', 13, 4, '29/05/2018', '6afsa1321s', new Owner('6a28f2', 'Swaggaaa'), null, 'http://www.google.es', 'google.es'));
        this.contributions.push(new UrlContribution('Who\'s that hoe', 7, 2, '27/05/2018', '6afsahfh1s', new Owner('6a28f2', 'Swaggaaa'), null, 'http://www.hoes.com', 'hoes.com'));
        this.contributions.push(new UrlContribution('The biggest mountain', 19, 8, '27/05/2018', '8fidj209sa', new Owner('f09g3d', 'SferaDev'), null, 'http://www.wikipedia.org', 'wikipedia.org'));
    }

    ngOnInit() {
    }

}
