import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Settings } from 'src/app/models/settings';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  selectedItem = 'מוצרים';
  listItems = [
    { title: 'החנות שלי', link: '/products', icon: 'my_store' },
    { title: 'מוצרים', link: '/products', icon: 'product' },
    { title: 'הזמנות', link: '/shipments', icon: 'orders' },
    { title: 'קופונים', link: '/coupons', icon: 'cupon' }
  ];

  bottomItems = [

    { title: 'צפייה בחנות', link: null, externalLink: 'ystore.co.il', icon: 'store' },
    { title: 'הגדרות', link: '/settings', icon: 'settings' },
  ];

  subdomain: string;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private settingsService: SettingsService
    ) {
    this.listItems.forEach(element => {
      this.matIconRegistry.addSvgIcon(
        element.icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/' + element.icon + '.svg')
      );
    });

    this.bottomItems.forEach(element => {
      this.matIconRegistry.addSvgIcon(
        element.icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/img/' + element.icon + '.svg')
      );
    });
    router.events.subscribe((val) => {
      // console.log(this.router.url);
      this.listItems.concat(this.bottomItems).forEach(element => {
        if (this.router.url.indexOf(element.link) !== -1){
          this.selectedItem = element.title;
        }
      });


    });

   }

  ngOnInit(): void {
        this.settingsService.getSettings().subscribe((settings: Settings) => {
          this.subdomain = settings.company_subdomain;
        });
  }

  handleClick(selectedItem) {
    if (selectedItem.link) {
      this.selectedItem = selectedItem.title;
    }
  }

}
