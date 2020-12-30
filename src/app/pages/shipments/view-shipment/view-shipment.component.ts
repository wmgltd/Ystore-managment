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
  discoutTypeList = [
    { key: 1, text: '%' },
    { key: 2, text: '₪', }
  ];
  id: number;
  shipment: Shipment = new Shipment();
  constructor(
    private shipmentsService: ShipmentsService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ViewShipmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.id = this.data.id;
    this.getShipmentById(this.id);
    this.shipmentForm = this.formBuilder.group({
      customer_name: new FormControl({ value: '', disabled: true }, Validators.required),
      customer_email: new FormControl({ value: '', disabled: true }, Validators.required),
      customer_phone: new FormControl({ value: '', disabled: true }),
      customer_company: new FormControl({ value: '', disabled: true }),
      customer_note: new FormControl({ value: '', disabled: true }),
      sum: new FormControl({ value: '', disabled: true }, Validators.required),
      customer_address: new FormControl({ value: '', disabled: true }, Validators.required),
      customer_city: new FormControl({ value: '', disabled: true }, Validators.required),
      delivery_type: new FormControl({ value: '', disabled: true }, Validators.required),
      catalog_number: new FormControl({ value: '', disabled: true }, Validators.required),
      order_details: this.formBuilder.array([])
    });
  }



  getShipmentById(id: any) {
    this.shipmentsService.get(id).subscribe((shipment: Shipment) => {
      this.shipment = shipment;
      var sum = this.shipment.delivery_cost;
      sum = +this.shipment.sum * 1 + sum * 1;
      this.shipmentForm.setValue({
        customer_name: shipment.customer_name,
        customer_email: shipment.customer_email,
        customer_phone: shipment.customer_phone,
        customer_company: shipment.customer_company,
        customer_note: shipment.customer_note,
        sum: sum,
        customer_address: shipment.customer_address,
        customer_city: shipment.customer_city,
        delivery_type: shipment.delivery_type,
        catalog_number: shipment.catalog_number,
        order_details: [],
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
  closeDialog() {
    this.dialogRef.close();

  }
  get orderDetails() {
    return this.shipmentForm.get('order_details') as FormArray;
  }
}
