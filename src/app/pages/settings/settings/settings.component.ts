import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Settings } from 'src/app/models/settings';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CroperComponent } from 'src/app/components/croper/croper.component';
import { TranslationWidth } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],

})
export class SettingsComponent implements OnInit {
  settings: Settings = new Settings();
  imgUrl = environment.imgUrl;
  selectedIndex = 0;
  showAdressForm: boolean = false;
  navLinks = [
    { label: 'הגדרות חברה', path: '/settings/company-details' },
    { label: 'הגדרות סליקה', path: '/settings/credit-clearing' },
    { label: 'סוגי משלוח', path: '/settings/delivery-type' },
    { label: 'קישורים חיצוניים', path: '/settings/external-link' },
    { label: 'קטגוריות', path: '/settings/category' }

  ];
  constructor(
    private router: Router, private settingsService: SettingsService,
    public dialog: MatDialog) { }

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
      this.settingsService;
      console.log(settings.data);
      this.showAdressForm = Boolean(Number(settings.data.show_adress_form));
      console.log(this.showAdressForm);
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

        reader.onload = (eve: any) => {
          var banner;
          this.settingsService.uploadImage(this.settings.id,
            eve.target.result, columnName,
            this.settings[columnName])
            .subscribe(() => {
              this.initialSettings();
              console.log(event.target.files[i]);
              var ratio = 5.42;
              var toHeight = 225;
              var toWidth = 1220;
              if (columnName == "logo") {
                ratio = 2;
                toHeight = 100;
                toWidth = 200;
              }
              const dialogRef = this.dialog.open(CroperComponent, {
                width: '75%',
                minWidth: '650px',
                data: { image: event.target.files[i], aspectRatio: ratio, toHeight: toHeight, toWidth: toWidth }
              });

              dialogRef.afterClosed().subscribe(result => {
                console.log(result);
                this.settingsService.uploadImage(this.settings.id, result, columnName, this.settings[columnName]).subscribe(() => this.initialSettings());
              });
              console.log(eve.target.result);
            });
          // TODO save file
        };
        // tslint:disable-next-line: no-shadowed-variable

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  // public iktuv() {
  //   this.settingsService.iktuv().subscribe((res) => {
  //     console.log(res);
  //   })
  // }
}
