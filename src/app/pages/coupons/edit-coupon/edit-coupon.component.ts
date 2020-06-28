import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CouponsService } from 'src/app/services/coupons.service';
import { Coupon } from 'src/app/models/coupon';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from 'src/app/components/delete-confirm-dialog/delete-confirm-dialog.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-coupon',
  templateUrl: './edit-coupon.component.html',
  styleUrls: ['./edit-coupon.component.scss']
})
export class EditCouponComponent implements OnInit {

  couponsForm: FormGroup;
  statusList = [{value:0,text:"לא פעיל"},{value:1,text:"פעיל"}];
  discountTypeList = [{value:1,text:"אחוז"},{value:2,text:"סכום"}];
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  id:number;
  
  constructor(private router: Router, private route: ActivatedRoute,  private formBuilder: FormBuilder ,private couponsService :CouponsService
    ,public dialogRef: MatDialogRef<EditCouponComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.id = this.data.id;
    this.getcouponById(this.id);
    this.couponsForm = this.formBuilder.group({
      id : [null, Validators.required],
      name : [null, Validators.required],
      code : [null, Validators.required],
      discount : [null, Validators.required],
      discount_type : [null, Validators.required],
      quantity : [null, Validators.required],
      quantity_utilized : [null, Validators.required],
      expiry_date : [null, Validators.required],
      status : [null, Validators.required],
    });
  }
  getcouponById(id: any) {
    this.couponsService.get(id).subscribe((coupon: Coupon) => {
      this.couponsForm.setValue({
        id : coupon.id,
        name : coupon.name,
        code : coupon.code,
        discount : coupon.discount,
        discount_type : +coupon.discount_type,
        quantity : coupon.quantity,
        quantity_utilized : coupon.quantity_utilized,
        expiry_date : coupon.expiry_date,
        status : coupon.status,
      });
    }); 
  }
  openDeleteConfirmModal(){
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result:boolean)=> {
      if(result)
        this.deleteCoupon();
    });
  }
  deleteCoupon(){
    this.couponsService.delete(this.data.id)
      .subscribe(res => {
        this.dialogRef.close();
          
        }, (err) => {
          console.log(err);
          this.dialogRef.close();
        }
      );
  }
  onFormSubmit() {
    
    this.couponsService.edit(this.couponsForm.value)
      .subscribe((coupon: Coupon) => {
        this.dialogRef.close();

        }, (err: any) => {
          console.log(err);
          this.dialogRef.close();
        }
      );
  }
  
  
}
