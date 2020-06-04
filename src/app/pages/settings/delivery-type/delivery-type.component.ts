import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SettingsService } from 'src/app/services/settings.service';
import { Settings } from 'src/app/models/settings';
import { DeliveryType } from 'src/app/models/delivery-type';
import { throwError } from 'rxjs';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-delivery-type',
  templateUrl: './delivery-type.component.html',
  styleUrls: ['./delivery-type.component.scss']
})
export class DeliveryTypeComponent implements OnInit {
  settingsForm: FormGroup;
  removedItems:any[]=[];
  matcher = new MyErrorStateMatcher();
  @Output()
  form_submit = new EventEmitter<string>();
  private _settings;
  @Input()
  set settings(settings: Settings) {
    this._settings=settings;
    if(!settings||!settings.id)
      return;
      this.deliveryTypes.clear();

      this.settings.delivery_types.forEach((d)=>{
        this.deliveryTypes.push(this.formBuilder.group({
          id:[d.id],
          type:[d.type, Validators.required],
          cost:[d.cost, Validators.required]
        }));

      }); 
    
    
  }

  get settings(): Settings { return this._settings; }

  constructor(private formBuilder: FormBuilder,private settingsService :SettingsService){
    this.settingsForm = this.formBuilder.group({
      delivery_types : this.formBuilder.array([]) 
    });
  }
  ngOnInit(){
    
  }
  
  onFormSubmit() {
    
    this.settingsService.editDeliveryTypes({id:this.settings.id,delivery_types:this.deliveryTypes.value,removed_items:this.removedItems})
      .subscribe((settings: Settings) => {
          
        this.form_submit.emit('complete');

          //this.getsettingsById(this.id);
          //this.router.navigate(['/settingss']);
        }, (err: any) => {
          console.log(err);
         
        }
      );
  }
  get deliveryTypes() {
    return this.settingsForm.get('delivery_types') as FormArray;
  }
  addItem(){
    this.deliveryTypes.push(this.formBuilder.group({
      id:[null],
      type:[null, Validators.required],
      cost:[null, Validators.required]
    }));
  }
  removeItem(index:number){
    if(this.deliveryTypes.at(index).get('id').value)
        this.removedItems.push(this.deliveryTypes.at(index).get('id').value);
    this.deliveryTypes.removeAt(index);

  }
}
