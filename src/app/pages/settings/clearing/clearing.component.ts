import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Clearing } from 'src/app/models/clearing';
import { Settings } from 'src/app/models/settings';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-clearing',
  templateUrl: './clearing.component.html',
  styleUrls: ['./clearing.component.scss']
})
export class ClearingComponent implements OnInit {
  masof;
  payments = [];
  settings: Settings;
  clearing: Clearing = new Clearing();
  clearingForm: FormGroup;
  constructor(
    private settingsService: SettingsService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setPayments();
    this.clearingForm = this.formBuilder.group({
      masof_yaad: new FormControl({ value: null, disabled: true }),
      payments_field: new FormControl({ value: 1 }),
      module_hesh: new FormControl({ value: 1 }),
    });
    this.getStore();
  }
  setPayments() {
    for (let index = 1; index <= 36; index++) {
      this.payments.push(index);
    }
  }
  getStore() {
    this.settingsService.get().subscribe((set: any) => {
      this.settings = set.data;
      if (this.settings.yaad_clearing) {
        this.clearing = JSON.parse(this.settings.yaad_clearing);
      }
      console.log(this.clearing);
      this.clearing.masof = this.settings.yaad_masof;
      console.log(this.clearing);
      this.clearingForm.setValue({
        masof_yaad: this.clearing.masof,
        payments_field: this.clearing.payments_field,
        module_hesh: this.clearing.module_hesh,
      });
    });

  }
  onFormSubmit() {
    console.log(this.clearingForm.value);
    this.settingsService.editClearing(this.clearingForm.value).subscribe((res: any) => {
      console.log(res);
    })
  }
}
