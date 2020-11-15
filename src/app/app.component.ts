import { environment } from './../environments/environment.prod';
import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'yStore-management';
  icons = [
    'plus',
    'view',
    'edit',
    'trash',
    'img',
    'picture',
    'cloud_upload',
    'upload_file',
    'facebook',
    'instagram',
    'cancel',
    'add',
    'phone',
    'location',
  ];

  constructor(
    public router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document
  ) {
    this.icons.forEach((element) => {
      this.matIconRegistry.addSvgIcon(
        element,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          './assets/img/' + element + '.svg'
        )
      );
    });
  }

  ngOnInit(): void {
    let bases = this.document.getElementsByTagName('base');

    if (bases.length > 0) {
      bases[0].setAttribute('href', environment.baseHref);
    }
  }
}
