import { Component, OnInit } from '@angular/core';
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
  statusList = [{value:0,text:"לא פעיל"},{value:1,text:"פעיל"}];
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  imageSrc: string;
  id:number = 1;
  constructor(private router: Router, private route: ActivatedRoute,  private formBuilder: FormBuilder ,private settingsService :SettingsService) { }

  ngOnInit(): void {
    //this.id = this.route.snapshot.params.id;
    this.getsettingsById(this.id);
    this.settingsForm = this.formBuilder.group({
      id : [null, Validators.required],
      store_id : [null, Validators.required],
      store_name : [null, Validators.required],
      store_description : [null, Validators.required],
      logo : [null, Validators.required],
      main_banner : [null, Validators.required],
      primary_address : [null, Validators.required],
      site_link : [null],
      facebook_link : [null],
      whatsapp_link : [null],
      messenger_link : [null],
      payment_page_address : [null, Validators.required],
      success_page_address : [null, Validators.required],
      code_analytics : [null],
      terms_link : [null],
      currency : [null, Validators.required],
      languages : [null, Validators.required],
    });
  }
  getsettingsById(id: any) {
    this.settingsService.get(id).subscribe((settings: Settings) => {
      this.settingsForm.setValue(settings
      //   {
      //   id : settings.id,
      //   store_name : settings.id,
      //   store_description : settings.id,
      //   logo : settings.id,
      //   main_banner : settings.id,
      //   primary_address : settings.id,
      //   site_link : settings.id,
      //   facebook_link : settings.id,
      //   whatsapp_link : settings.id,
      //   messenger_link : settings.id,
      //   payment_page_address : settings.id,
      //   success_page_address : settings.id,
      //   code_analytics : settings.id,
      //   terms_link : settings.id,
      //   currency : settings.id,
      //   languages : settings.id,
      // }
      );
    });
  }
  onFormSubmit() {
    this.isLoadingResults = true;
    this.settingsService.edit(this.settingsForm.value)
      .subscribe((settings: Settings) => {
          this.isLoadingResults = false;
          this.getsettingsById(this.id);
          //this.router.navigate(['/settingss']);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
  
}
