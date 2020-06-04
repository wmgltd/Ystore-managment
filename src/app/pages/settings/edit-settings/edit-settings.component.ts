import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { SettingsService } from 'src/app/services/settings.service';
import { Settings } from 'src/app/models/settings';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-edit-settings',
  templateUrl: './edit-settings.component.html',
  styleUrls: ['./edit-settings.component.scss']
})
export class EditSettingsComponent implements OnInit {

  settingsForm: FormGroup;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  imageSrc: string;
  id:number = 1;

  private _settings :Settings;
  @Output()
  form_submit = new EventEmitter<string>();
  @Input()
  set settings(settings: Settings) {
    this._settings=settings;
    if(!settings||!settings.id)
      return;
    this.settingsForm.setValue(
      {
         id : settings.id, 
         store_id : settings.store_id,
         company_name : settings.company_name,
         company_email : settings.company_email,
         company_phone : settings.company_phone,
         company_city : settings.company_city,
         company_address : settings.company_address
     }
    );
  }

  get settings(): Settings { return this._settings; }

  constructor(private router: Router, private route: ActivatedRoute,  private formBuilder: FormBuilder ,private settingsService :SettingsService) {
    this.settingsForm = this.formBuilder.group({
      id : [null, Validators.required],
      store_id : [null, Validators.required],
      company_name : [null, Validators.required],
      company_email : [null, Validators.required],
      company_phone : [null, Validators.required],
      company_city : [null],
      company_address : [null]
    });
   }

  ngOnInit(): void {
    //this.id = this.route.snapshot.params.id;
    
    
  }
 
  onFormSubmit() {
    this.isLoadingResults = true;
    this.settingsService.edit(this.settingsForm.value)
      .subscribe((settings: Settings) => {
          this.isLoadingResults = false;
          this.form_submit.emit('complete');

          //this.getsettingsById(this.id);
          //this.router.navigate(['/settingss']);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
  
}
