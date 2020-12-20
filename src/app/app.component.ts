import { environment } from './../environments/environment.prod';
import { Component, OnInit, Inject } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RouterEvent } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showMenu = true;
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
    public route: ActivatedRoute,
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
    let path = this.router.config[0].path;
    console.log(path);
    if (path == "auth/signup" || path == "error") {
      this.showMenu = false;
    };

    router.events.subscribe(e => {
      console.log("aaa");
      if (e instanceof NavigationEnd) {
        let url;
        console.log(e.url);
        if (e.url.includes('?')) {
          url = e.url.substr(0, e.url.indexOf("?"));
          console.log(url);
        }
        else {
          url = e.url;
        }
        if (url != "/auth/signup" && url != "/error") {
          console.log(e.url.substr(0, e.url.indexOf("?")));
          this.showMenu = true;
        }
        else {
          this.showMenu = false;
        }
      }
    });
  }

  ngOnInit(): void {
    // let bases = this.document.getElementsByTagName('base');
    // console.log(bases);
    // if (bases.length > 0) {
    //   bases[0].setAttribute('href', environment.baseHref);
    // }
  }
}
