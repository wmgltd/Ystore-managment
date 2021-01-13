import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CouponsService } from '../../../services/coupons.service';
import { Coupon } from '../../../models/coupon';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss']
})
export class AddCouponComponent implements OnInit {

  couponsForm: FormGroup;
  coupon: Coupon;
  statusList = [{ value: 0, text: 'לא פעיל' }, { value: 1, text: 'פעיל' }];
  discountTypeList = [{ value: 1, text: 'אחוז' }, { value: 2, text: 'סכום' }];
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private couponsService: CouponsService,
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddCouponComponent>) { }

  ngOnInit(): void {
    this.couponsForm = this.formBuilder.group({
      name: [null, Validators.required],
      code: [null, {
        validators: [Validators.required],
        asyncValidators: [this.uniqueCode()], // this is how you use a validator
        updateOn: 'blur', // run validation on blur}],
      }],
      discount: [null, Validators.required],
      discount_type: [null, Validators.required],
      quantity: [null, Validators.required],
      purchase_amount: [0],
      including_shipping: [1, Validators.required],
      expiry_date: [null, Validators.required]
    });
  }

  onFormSubmit() {
    // this.isLoadingResults = true;
    console.log(this.couponsForm.value);
    this.couponsService.add(this.couponsForm.value)
      .subscribe((res: any) => {
        this.isLoadingResults = false;
        this.dialogRef.close();
      }, (err: any) => {
        console.log(err);
        this.dialogRef.close();
        this.isLoadingResults = false;
      });
  }
  // validation_code(code) {
  //   console.log(code);
  //   this.couponsService.validation_code(code).subscribe((res) => {
  //   });
  // }
  private uniqueCode() {
    return (ctrl: AbstractControl) => {
      // this is how you define a validator function
      const code = ctrl.value;
      return code // async validators return an Observable or Promise
        ? this.couponsService
          .validation_code(code)
          .pipe(
            map((isUnique) =>
              isUnique ? null : { subdomainNotUnique: true }
            )
          ) // validators return null if they're valid, otherwise some object
        : of(null); // don't bother checking if no value
    };
  }
}

