import { Component, OnInit } from '@angular/core';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { Shipment } from 'src/app/models/shipment';
import { MatDialog } from '@angular/material/dialog';
import { EditShipmentComponent } from '../edit-shipment/edit-shipment.component';
import { ViewShipmentComponent } from '../view-shipment/view-shipment.component';

@Component({
  selector: 'app-shipments-list',
  templateUrl: './shipments-list.component.html',
  styleUrls: ['./shipments-list.component.scss']
})
export class ShipmentsListComponent implements OnInit {
  data: Shipment[] = [];
  displayedColumns: string[] = ['catalog_number', 'customer_name', 'sum', 'datetime',
    'delivery_type', 'customer_address',
    'customer_house_number', 'customer_city', 'reference', 'credit_company_approval', 'digit4', 'payments', 'hesh', 'status', 'actions'];
  isLoadingResults = true;
  statusList = [
    { key: 0, text: 'ממתין למשלוח', color: '#C5A91E' },
    { key: 1, text: 'נשלח', color: '#66C51E' }
  ];
  constructor(private shipmentsService: ShipmentsService
    , public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getShipmentsList();
  }

  getShipmentsList() {
    this.shipmentsService.getList()
      .subscribe((res: Shipment[]) => {
        console.log(res);
        this.data = res.sort((a, b) => {
          if (a.status > b.status) {
            return 1;
          }

          if (b.status > a.status) {
            return -1;
          }
          if (+a.id > +b.id) {
            return 1;
          }
          return -1;
        });
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
  changeStatus(item) {
    item.status = +item.status ? 0 : 1;
    this.shipmentsService.changeStatus(+item.id, item.status).subscribe(() => {
      console.log('status changed');
    });
  }
  deleteShipment(shipment: Shipment) {
    this.isLoadingResults = true;
    this.shipmentsService.delete(shipment.id)
      .subscribe(res => {
        this.getShipmentsList();
        // this.isLoadingResults = false;

      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }


  editShipment(id: number): void {
    const dialogRef = this.dialog.open(EditShipmentComponent, {
      width: '70%',
      minWidth: '650px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getShipmentsList();
    });
  }


  viewShipment(id: number): void {
    const dialogRef = this.dialog.open(ViewShipmentComponent, {
      width: '50%',
      minWidth: '650px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.getProductsList()
      // add coupon
    });
  }

}
