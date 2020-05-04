import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {ShipmentsService} from '../../../services/shipments.service';
import {Shipment} from '../../../models/shipment';
import { HttpClient } from '@angular/common/http';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-shipment',
  templateUrl: './add-shipment.component.html',
  styleUrls: ['./add-shipment.component.scss']
})
export class AddShipmentComponent implements OnInit {

 
  shipmentsForm: FormGroup;
  shipment : Shipment;
  statusList = ['Positive', 'Dead', 'Recovered'];
  genderList = ['Male', 'Female'];
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private formBuilder: FormBuilder, private shipmentsService :ShipmentsService,private http: HttpClient) { }

  ngOnInit(): void {
    this.shipmentsForm = this.formBuilder.group({
      name : [null, Validators.required],
      sum : [null, Validators.required],
      condition : [null, Validators.required],
      status : [null, Validators.required],
    });
  }
  
  onFormSubmit() {
    this.isLoadingResults = true;
    this.shipmentsService.add(this.shipmentsForm.value)
      .subscribe((res: any) => {
          this.isLoadingResults = false;
          this.router.navigate(['/shipments']);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
  
    
   
}
   
