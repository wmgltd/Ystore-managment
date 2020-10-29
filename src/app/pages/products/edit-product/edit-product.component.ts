import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';
import { DeleteConfirmDialogComponent } from 'src/app/components/delete-confirm-dialog/delete-confirm-dialog.component';

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

  constructor(private router: Router, private route: ActivatedRoute,
              private formBuilder: FormBuilder , private productsService: ProductsService,
              private categoryService: CategoryService,
              public dialogRef: MatDialogRef<EditProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog) {
      this.productsForm = this.formBuilder.group({
        id : [null, Validators.required],
        name : [null, Validators.required],
        img: new FormControl(''),
        fileSource: new FormControl(''),
        description : [null, Validators.required],
        catalog_number: new FormControl(null),
        category_id: new FormControl(null, [Validators.required]),
        price : [null, Validators.required],
        sale_price : [null],
        stock_units : [null, Validators.required],

      });
    }

  productsForm: FormGroup;
  statusList = [{value: 0, text: 'לא פעיל'}, {value: 1, text: 'פעיל'}];
  isLoadingResults = false;
  categories: Category[];

  matcher = new MyErrorStateMatcher();
  imageSrc: string;
  id: number;
  imgUrl = environment.imgUrl;
  urls = [];

  ngOnInit(): void {
    this.getCategories();

    this.id = this.data.id;
    this.getProductById(this.id);

  }
  getProductById(id: any) {
    this.productsService.get(id).subscribe((product: Product) => {
      this.urls = product.files.map(f => {
          return{
            id: f.id,
            path: f.path,
            is_removed: false
          };
        });
      this.productsForm.patchValue({
        fileSource: this.urls
      });
      this.productsForm.setValue({
        id : product.id,
        name : product.name,
        img: '',
        fileSource: '',
        description : product.description,
        price : product.price,
        catalog_number : product.catalog_number,
        category_id : product.category_id,
        sale_price : product.sale_price,
        stock_units : product.stock_units,
      });
    });
  }
  getCategories(){
    this.categoryService.getList()
    .subscribe((res: Category[]) => {
      this.categories = res;
    }, err => {
      console.error(err);
    });
  }
  onFormSubmit() {
    this.productsService.edit(this.productsForm.value)
      .subscribe((product: Product) => {
          this.dialogRef.close();

        }, (err: any) => {
          console.log(err);
          this.dialogRef.close();
        }
      );
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        const filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                const reader = new FileReader();

                // tslint:disable-next-line: no-shadowed-variable
                reader.onload = (event: any) => {
                  console.log(event.target.result);
                  this.urls.push({
                    id: null,
                    path: event.target.result,
                    is_removed: false
                  });
                  this.productsForm.patchValue({
                    fileSource: this.urls
                  });
                };

                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }
  removeImage(index){
    if (index > -1) {
      if (this.urls[index].id) {
         this.urls[index].is_removed = true;
      }
      else {  this.urls.splice(index, 1); }
      this.productsForm.patchValue({
        fileSource: this.urls
      });
    }
  }
  hasImage(){
    return this.urls.find(x => x.is_removed === false);
  }
  openDeleteConfirmModal(){
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteProduct();
      }
    });
  }
  deleteProduct(){
    this.productsService.delete(this.data.id)
      .subscribe(res => {
        this.dialogRef.close();

        }, (err) => {
          this.dialogRef.close();

        }
      );
  }

}
