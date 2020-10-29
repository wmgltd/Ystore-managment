import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { Shipment } from 'src/app/models/shipment';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-view-shipment',
  templateUrl: './view-shipment.component.html',
  styleUrls: ['./view-shipment.component.scss']
})
export class ViewShipmentComponent implements OnInit {
  shipmentForm: FormGroup;

  id: number;
  constructor(
    private shipmentsService: ShipmentsService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ViewShipmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.id = this.data.id;
    this.getShipmentById(this.id);
    this.shipmentForm = this.formBuilder.group({
      customer_name : new FormControl({ value: '', disabled: true }, Validators.required),
      customer_email : new FormControl({ value: '', disabled: true }, Validators.required),
      sum : new FormControl({ value: '', disabled: true }, Validators.required),
      customer_address : new FormControl({ value: '', disabled: true }, Validators.required),
      customer_city : new FormControl({ value: '', disabled: true }, Validators.required),
      delivery_type : new FormControl({ value: '', disabled: true }, Validators.required),
      catalog_number: new FormControl({ value: '', disabled: true }, Validators.required),
      order_details : this.formBuilder.array([])

    });
  }



  getShipmentById(id: any) {
    this.shipmentsService.get(id).subscribe((shipment: Shipment) => {
      this.shipmentForm.setValue({
        customer_name : shipment.customer_name,
        customer_email : shipment.customer_email,
        sum : shipment.sum,
        customer_address : shipment.customer_address,
        customer_city : shipment.customer_city,
        delivery_type : shipment.delivery_type,
        catalog_number : shipment.catalog_number,
        order_details : []


      });

      shipment.order_details.forEach((d) => {
        this.orderDetails.push(this.formBuilder.group({
          id: [d.id],
          name: [d.name],
          quantity: [d.quantity],
          cost: [d.cost, Validators.required]
        }));

      });
    });
  }
  closeDialog(){
    this.dialogRef.close();

   }
   get orderDetails() {
    return this.shipmentForm.get('order_details') as FormArray;
  }
}
