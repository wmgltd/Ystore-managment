import { Component, OnInit } from '@angular/core';
import { CouponsService } from 'src/app/services/coupons.service';
import { Coupon } from 'src/app/models/coupon';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddCouponComponent } from '../add-coupon/add-coupon.component';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { EditCouponComponent } from '../edit-coupon/edit-coupon.component';

@Component({
  selector: 'app-coupons-list',
  templateUrl: './coupons-list.component.html',
  styleUrls: ['./coupons-list.component.scss']
})
export class CouponsListComponent implements OnInit {
  data: Coupon[] = [];
  displayedColumns: string[] = ['status', 'code', 'discount', 'discount_type', 'quantity','quantity_utilized','expiry_date','open'];
  isLoadingResults = true;
  breakpoint=3;
  constructor(private couponsService :CouponsService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCouponsList();
    this.breakpoint = (window.innerWidth <= 576) ?1: (window.innerWidth <= 1200) ?2:3;

  }
  onResize(event) {
    this.breakpoint = (window.innerWidth <= 576) ?1: (window.innerWidth <= 1200) ?2:3;
  }
changeStatus(item,event: MatSlideToggleChange){
  item.status=event.checked?1:0;
  this.couponsService.changeStatus(+item.id,event.checked?1:0).subscribe(()=>{
    console.log('status changed')
  });
}
  getCouponsList(){
    this.couponsService.getList()
    .subscribe((res: Coupon[]) => {
      this.data = res.sort((a,b)=>{
        if(a.status<b.status)
          return 1
        
        if(b.status<a.status)
          return -1;
        if(+a.id>+b.id)
          return 1
        return -1;
      });
      //console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
  



  addCoupon(): void {
    const dialogRef = this.dialog.open(AddCouponComponent, { 
      width: '30%', 
      minWidth:'450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getCouponsList()
      //add coupon
    });
  }

  editCoupon(id:number): void {
    const dialogRef = this.dialog.open(EditCouponComponent, { 
      width: '30%', 
      minWidth:'450px',
      data: {id:id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getCouponsList()
      //add coupon
    });
  }

}


