import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  productsForm: FormGroup;
  statusList = [{value:0,text:"לא פעיל"},{value:1,text:"פעיל"}];
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  imageSrc: string;
  id:number;
  constructor(private router: Router, private route: ActivatedRoute,  private formBuilder: FormBuilder ,private productsService :ProductsService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getProductById(this.id);
    this.productsForm = this.formBuilder.group({
      id : [null, Validators.required],
      name : [null, Validators.required],
      //img : [null, Validators.required],
      img: new FormControl(null),
      fileSource: new FormControl(null),
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
  getProductById(id: any) {
    this.productsService.get(id).subscribe((product: Product) => {
      this.productsForm.setValue({
        id : product.id,
        name : product.name,
        img: null,
        fileSource: null,
        description : product.description,
        provider : product.provider,
        english_name : product.english_name,
        english_description : product.english_description,
        price : product.price,
        sale_price : product.sale_price,
        stock_units : product.stock_units,
        status : product.status,
      });
    });
  }
  onFormSubmit() {
    this.isLoadingResults = true;
    this.productsService.edit(this.productsForm.value)
      .subscribe((product: Product) => {
          this.isLoadingResults = false;
          this.router.navigate(['/product']);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
  onFileChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        //this.imageSrc = reader.result as string;
     
        this.productsForm.patchValue({
          fileSource: reader.result,
          img:reader.result as string
        });
   
      };
   
    }
  }

}
