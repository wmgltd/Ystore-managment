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
  displayedColumns: string[] = ['status', 'name', 'sum', 'condition', 'open'];
  isLoadingResults = true;
  constructor(private shipmentsService :ShipmentsService) { }

  ngOnInit(): void {
    this.getShipmentsList();
  }

  getShipmentsList(){
    this.shipmentsService.getList()
    .subscribe((res: Shipment[]) => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
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
