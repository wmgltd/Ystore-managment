import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'yStore-management'; 
  icons=['plus','view','edit','trash','img','picture','cloud_upload','facebook','instagram','cancel','add','phone','location']

  constructor( 
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    ) {
    this.icons.forEach(element => {
      this.matIconRegistry.addSvgIcon(
        element,
        this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/img/"+element+".svg")
      );
    });
  }

    
  ngOnInit(): void {
    

  }

  
  
}
