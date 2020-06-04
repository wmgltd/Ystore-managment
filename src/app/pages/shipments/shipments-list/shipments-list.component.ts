import { Component, OnInit } from '@angular/core';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { Shipment } from 'src/app/models/shipment';

@Component({
  selector: 'app-shipments-list',
  templateUrl: './shipments-list.component.html',
  styleUrls: ['./shipments-list.component.scss']
})
export class ShipmentsListComponent implements OnInit {
  data: Shipment[] = [];
  displayedColumns: string[] = ['catalog_number','date','time', 'sum','code_coupon','customer_details','details','delivery_type','status'];
  isLoadingResults = true;
  statusList=[
    {key:0,text:'ממתין למשלוח',color:'#C5A91E'},
    {key:1,text:'נשלח',color:'#66C51E'}
  ];
  constructor(private shipmentsService :ShipmentsService) { }

  ngOnInit(): void {
    this.getShipmentsList();
  }

  getShipmentsList(){
    this.shipmentsService.getList()
    .subscribe((res: Shipment[]) => {
      this.data = res.sort((a,b)=>{
        if(a.status>b.status)
          return 1
        
        if(b.status>a.status)
          return -1;
        if(+a.id>+b.id)
          return 1
        return -1;
      });
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
  changeStatus(item){
    item.status=+item.status?0:1;
    this.shipmentsService.changeStatus(+item.id,item.status).subscribe(()=>{
      console.log('status changed')
    });
  }
  deleteShipment(shipment : Shipment){
    this.isLoadingResults = true;
    this.shipmentsService.delete(shipment)
      .subscribe(res => {
        this.getShipmentsList();
          //this.isLoadingResults = false;
          
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
