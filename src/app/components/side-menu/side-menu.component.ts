import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  selectedItem = 'מוצרים';
  listItems = [
    { title: 'החנות שלי', link: '/products',icon:'my_store' },
    { title: 'מוצרים', link: '/products',icon:'product' },
    { title: 'הזמנות', link: '/shipments',icon:'orders' },
    { title: 'קופונים', link: '/coupons',icon:'cupon' }
  ];

  bottomItems = [
   
    { title: 'צפייה בחנות', link:null,externalLink: 'http://185.28.152.210/~ystore/yStore-site/',icon:'store' },
    { title: 'הגדרות', link: '/settings',icon:'settings' },
  ];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
    ) {
    this.listItems.forEach(element => {
      this.matIconRegistry.addSvgIcon(
        element.icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/"+element.icon+".svg")
      );
    });

    this.bottomItems.forEach(element => {
      this.matIconRegistry.addSvgIcon(
        element.icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/"+element.icon+".svg")
      );
    });
    router.events.subscribe((val) => {
      //console.log(this.router.url);
      this.listItems.concat(this.bottomItems).forEach(element => {
        if(this.router.url.indexOf(element.link) !== -1){
          this.selectedItem=element.title;
        }
      });
      

    });

   }

  ngOnInit(): void {

  }
  
  handleClick(selectedItem) {
    if(selectedItem.link)
    this.selectedItem = selectedItem.title;
  }

}
