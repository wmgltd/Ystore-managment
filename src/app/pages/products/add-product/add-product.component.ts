import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {ProductsService} from '../../../services/products.service';
import {Product} from '../../../models/product';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productsForm: FormGroup;
  product : Product;
  statusList = ['Positive', 'Dead', 'Recovered'];
  genderList = ['Male', 'Female'];
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private formBuilder: FormBuilder, private productsService :ProductsService) { }

  ngOnInit(): void {
    this.productsForm = this.formBuilder.group({
      name : [null, Validators.required],
      img : [null, Validators.required],
      description : [null, Validators.required],
      provider : [null, Validators.required],
      english_name : [null, Validators.required],
      english_description : [null, Validators.required],
      price : [null, Validators.required],
      sale_price : [null, Validators.required],
      stock_units : [null, Validators.required],
      status : [null, Validators.required],
    });
  }
  
  onFormSubmit() {
    this.isLoadingResults = true;
    this.productsService.add(this.productsForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/products-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
