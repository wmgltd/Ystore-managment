import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  navLinks: any[];
  activeLinkIndex = -1;
  title = 'yStore-management';

  constructor(public router: Router) {
  }

    
  ngOnInit(): void {
    

  }
  
  
}
