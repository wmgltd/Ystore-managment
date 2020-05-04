import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ShipmentsService } from 'src/app/services/shipments.service';
import { Shipment } from 'src/app/models/shipment';

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

  shipmentsForm: FormGroup;
  statusList = [{value:0,text:"לא פעיל"},{value:1,text:"פעיל"}];
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  imageSrc: string;
  id:number;
  constructor(private router: Router, private route: ActivatedRoute,  private formBuilder: FormBuilder ,private shipmentsService :ShipmentsService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getshipmentById(this.id);
    this.shipmentsForm = this.formBuilder.group({
      id : [null, Validators.required],
      name : [null, Validators.required],
      sum : [null, Validators.required],
      condition : [null, Validators.required],
      status : [null, Validators.required],
    });
  }
  getshipmentById(id: any) {
    this.shipmentsService.get(id).subscribe((shipment: Shipment) => {
      this.shipmentsForm.setValue({
        id : shipment.id,
        name : shipment.name,
        sum : shipment.sum,
        condition : shipment.condition,
        status : shipment.status,
      });
    });
  }
  onFormSubmit() {
    this.isLoadingResults = true;
    this.shipmentsService.edit(this.shipmentsForm.value)
      .subscribe((shipment: Shipment) => {
          this.isLoadingResults = false;
          this.router.navigate(['/shipments']);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
  
}
