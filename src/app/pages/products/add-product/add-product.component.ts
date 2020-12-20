import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../models/product';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

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

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private http: HttpClient,
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categories: Category[], canAddProduct: boolean }) { }

  productsForm: FormGroup;
  product: Product;
  @Input()
  categories: Category[];
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  @Input()
  canAddProduct: boolean;
  urls = [];

  ngOnInit(): void {
    this.categories = this.data.categories;
    this.productsForm = this.formBuilder.group({
      name: [null, Validators.required],
      //img : [null, Validators.required],
      img: new FormControl(''),
      fileSource: new FormControl(''),
      catalog_number: new FormControl(null),
      category_id: new FormControl(null, [Validators.required]),
      description: [null, Validators.required],

      price: [null, Validators.required],
      sale_price: [null],
      stock_units: [null, Validators.required],
      //status : [null, Validators.required],
    });
  }
  onFormSubmit() {
    this.isLoadingResults = true;
    this.productsService.add(this.productsForm.value)
      .subscribe((res: any) => {
        this.isLoadingResults = false;
        this.dialogRef.close();
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();

        // tslint:disable-next-line: no-shadowed-variable
        reader.onload = (event: any) => {
          this.urls.push(event.target.result);
          this.productsForm.patchValue({
            fileSource: this.urls
          });
        };

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  removeImage(url) {
    const index = this.urls.indexOf(url);
    if (index > -1) {
      this.urls.splice(index, 1);
      this.productsForm.patchValue({
        fileSource: this.urls
      });
    }
  }


}
