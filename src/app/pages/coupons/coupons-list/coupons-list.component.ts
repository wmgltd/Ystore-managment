import { Component, OnInit } from '@angular/core';
import { CouponsService } from 'src/app/services/coupons.service';
import { Coupon } from 'src/app/models/coupon';

@Component({
  selector: 'app-coupons-list',
  templateUrl: './coupons-list.component.html',
  styleUrls: ['./coupons-list.component.scss']
})
export class CouponsListComponent implements OnInit {
  data: Coupon[] = [];
  displayedColumns: string[] = ['status', 'code', 'discount', 'discount_type', 'quantity','quantity_utilized','expiry_date','open'];
  isLoadingResults = true;
  constructor(private couponsService :CouponsService) { }

  ngOnInit(): void {
    this.getCouponsList();
  }

  getCouponsList(){
    this.couponsService.getList()
    .subscribe((res: Coupon[]) => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
  
  deleteCoupon(coupon : Coupon){
    this.isLoadingResults = true;
    this.couponsService.delete(coupon)
      .subscribe(res => {
        this.getCouponsList();
          //this.isLoadingResults = false;
          
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
