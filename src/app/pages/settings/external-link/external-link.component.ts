import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Settings } from 'src/app/models/settings';
import { FormGroup, FormControl, FormGroupDirective, NgForm, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SettingsService } from 'src/app/services/settings.service';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-external-link',
  templateUrl: './external-link.component.html',
  styleUrls: ['./external-link.component.scss']
})
export class ExternalLinkComponent implements OnInit {
  settingsForm: FormGroup;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  @Output()
  formSubmit = new EventEmitter<string>();
  // tslint:disable-next-line: variable-name
  private _settings: Settings;

  @Input()
  set settings(settings: Settings) {
    this._settings = settings;
    if (!settings || !settings.id) {
      return;
    }
    this.settingsForm.setValue(
      {
         id : settings.id,
         store_id : settings.id,
         external_facebook_page : settings.external_facebook_page,
         external_instagram_page	 : settings.external_instagram_page	,
         external_facebook_pixel	 : settings.external_facebook_pixel	,
         external_google_analytics	 : settings.external_google_analytics
      }
    );
  }

  get settings(): Settings { return this._settings; }

  constructor(private formBuilder: FormBuilder , private settingsService: SettingsService) {
    this.settingsForm = this.formBuilder.group({
      id : [null, Validators.required],
      store_id : [null, Validators.required],
      external_facebook_page : [null],
      external_instagram_page	 : [null],
      external_facebook_pixel	 : [null],
      external_google_analytics	 : [null],
    });
  }

  ngOnInit(): void {
    // this.id = this.route.snapshot.params.id;

  }
  onFormSubmit() {
    this.isLoadingResults = true;
    this.settingsService.editExternal(this.settingsForm.value)
      .subscribe((settings: Settings) => {
          this.isLoadingResults = false;
          this.formSubmit.emit('complete');

          // this.getsettingsById(this.id);
          // this.router.navigate(['/settingss']);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
