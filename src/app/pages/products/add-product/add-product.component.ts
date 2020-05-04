import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {ProductsService} from '../../../services/products.service';
import {Product} from '../../../models/product';
import { HttpClient } from '@angular/common/http';

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

  constructor(private router: Router, private formBuilder: FormBuilder, private productsService :ProductsService,private http: HttpClient) { }

  ngOnInit(): void {
    this.productsForm = this.formBuilder.group({
      name : [null, Validators.required],
      //img : [null, Validators.required],
      img: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required]),
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
          this.isLoadingResults = false;
          this.router.navigate(['/products']);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
  imageSrc: string;
   myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  
    
  get f(){
    return this.myForm.controls;
  }
   
  onFileChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
     
        this.productsForm.patchValue({
          fileSource: reader.result
        });
   
      };
   
    }
  }
   
  submit(){
    console.log(this.myForm.value);
    this.http.post('http://localhost:88/upload.php', this.myForm.value)
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }

}
