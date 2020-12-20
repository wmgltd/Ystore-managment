import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Settings } from 'src/app/models/settings';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],

})
export class SettingsComponent implements OnInit {
  settings: Settings = new Settings();
  imgUrl = environment.imgUrl;
  selectedIndex = 0;
  navLinks = [
    { label: 'הגדרות חברה', path: '/settings/company-details' },
    { label: 'סוגי משלוח', path: '/settings/delivery-type' },
    { label: 'קישורים חיצוניים', path: '/settings/external-link' },
    { label: 'קטגוריות', path: '/settings/category' }

  ];
  constructor(private router: Router, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.initialSettings();
    this.navLinks.forEach((element, index) => {
      if (this.router.url === element.path) {
        this.selectedIndex = index;
      }
    });
  }



  initialSettings() {
    console.log();
    this.settingsService.get().subscribe((settings: any) => {
      this.settings = settings.data;
      this.settingsService
      console.log(this.settings);
    });
  }

  navigateTab(event: MatTabChangeEvent) {
    this.selectedIndex = event.index;
    this.router.navigate([this.navLinks[event.index].path], { queryParamsHandling: 'preserve' });

  }
  onSelectFile(event, columnName: string) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();

        // tslint:disable-next-line: no-shadowed-variable
        reader.onload = (event: any) => {
          this.settingsService.uploadImage(this.settings.id,
            event.target.result, columnName,
            this.settings[columnName])
            .subscribe(() => {
              this.initialSettings();
            });
          console.log(event.target.result);
          // TODO save file
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  public iktuv() {
    this.settingsService.iktuv().subscribe((res) => {
      console.log(res);
    })
  }
}
