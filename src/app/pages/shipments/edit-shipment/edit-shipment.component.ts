import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { Shipment } from 'src/app/models/shipment';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DeliveryType } from 'src/app/models/delivery-type';
import { Settings } from 'src/app/models/settings';
import { SettingsService } from 'src/app/services/settings.service';
import { DeleteConfirmDialogComponent } from 'src/app/components/delete-confirm-dialog/delete-confirm-dialog.component';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-edit-shipment',
  templateUrl: './edit-shipment.component.html',
  styleUrls: ['./edit-shipment.component.scss']
})
export class EditShipmentComponent implements OnInit {

  shipmentForm: FormGroup;

  matcher = new MyErrorStateMatcher();
  deliveryTypes: DeliveryType[];
  id: number;
  shipment: Shipment = new Shipment();
  statusList = [
    { key: 0, text: 'ממתין למשלוח', color: '#C5A91E' },
    { key: 1, text: 'נשלח', color: '#66C51E' }
  ];
  constructor(private shipmentsService: ShipmentsService,
    private settingsService: SettingsService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditShipmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getDeliveryTypes();

    this.id = this.data.id;
    this.getShipmentById(this.id);
    this.shipmentForm = this.formBuilder.group({
      id: new FormControl({ value: null }, Validators.required),
      status: new FormControl({ value: null }, Validators.required),
      customer_name: new FormControl({ value: '' }, Validators.required),
      customer_email: new FormControl({ value: '' }),
      customer_phone: new FormControl({ value: '' }),
      customer_company: new FormControl({ value: '' }),
      customer_note: new FormControl({ value: '' }),
      sum: new FormControl({ value: 0, disabled: true }, Validators.required),
      customer_address: new FormControl({ value: '' }, Validators.required),
      customer_city: new FormControl({ value: '' }, Validators.required),
      delivery_type_id: new FormControl({ value: null }, Validators.required),
      catalog_number: new FormControl({ value: '', disabled: true }, Validators.required),
      order_details: this.formBuilder.array([])
    });
  }
  getDeliveryTypes() {
    this.settingsService.get().subscribe((settings: any) => {
      this.deliveryTypes = settings.data.delivery_types;
    });
  }
  getShipmentById(id: any) {
    this.shipmentsService.get(id).subscribe((shipment: Shipment) => {
      this.shipment = shipment;
      console.log(this.shipment);
      var sum = this.shipment.delivery_cost;
      sum = +this.shipment.sum * 1 + sum * 1;
      this.shipmentForm.setValue({
        id: shipment.id,
        status: shipment.status,
        customer_name: shipment.customer_name,
        customer_email: shipment.customer_email,
        customer_phone: shipment.customer_phone,
        customer_company: shipment.customer_company,
        customer_note: shipment.customer_note,
        sum: sum,
        customer_address: shipment.customer_address,
        customer_city: shipment.customer_city,
        delivery_type_id: shipment.delivery_type_id,
        catalog_number: shipment.catalog_number,
        order_details: []
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
  get orderDetails() {
    return this.shipmentForm.get('order_details') as FormArray;
  }
  onFormSubmit() {
    this.shipmentsService.edit(this.shipmentForm.value)
      .subscribe((shipment: Shipment) => {
        this.dialogRef.close();

      }, (err: any) => {
        console.log(err);
      }
      );
  }

  openDeleteConfirmModal() {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteShipment();
      }
    });
  }
  deleteShipment() {
    this.shipmentsService.delete(this.data.id)
      .subscribe(res => {
        this.dialogRef.close();

      }, (err) => {
        console.log(err);
      }
      );
  }
  changeStatus(item) {
    item.status = +item.status ? 0 : 1;
    this.shipmentForm.patchValue({
      status: item.status
    });
  }

}
