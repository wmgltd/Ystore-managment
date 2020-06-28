import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';
import { environment } from 'src/environments/environment';
import { DeleteConfirmDialogComponent } from 'src/app/components/delete-confirm-dialog/delete-confirm-dialog.component';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  productsForm: FormGroup;
  statusList = [{value:0,text:"לא פעיל"},{value:1,text:"פעיל"}];
  id:number;
  categories:Category[];
  urls :any[];
  imgUrl=environment.imgUrl;



  constructor(private formBuilder: FormBuilder ,private productsService :ProductsService,
    private categoryService :CategoryService,
    public dialogRef: MatDialogRef<ViewProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCategories();

    this.id = this.data.id;
    this.getProductById(this.id);
    this.productsForm = this.formBuilder.group({
      name : new FormControl({ value: '', disabled: true }, Validators.required),
      //img : [null, Validators.required],
      img: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required]),
      catalog_number: new FormControl({ value: '', disabled: true }, Validators.required),
      category_id: new FormControl({ value: '', disabled: true }, Validators.required),
      description : new FormControl({ value: '', disabled: true }, Validators.required),
      
      price : new FormControl({ value: '', disabled: true }, Validators.required),
      sale_price : new FormControl({ value: '', disabled: true }, Validators.required),
      stock_units : new FormControl({ value: '', disabled: true }, Validators.required),
      //status : [null, Validators.required],
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
  getProductById(id: any) {
    this.productsService.get(id).subscribe((product: Product) => {
      this.urls=product.files.map(f=>f.path);
      this.productsForm.setValue({
        name : product.name,
        img: "",
        fileSource: "",
        description : product.description,
        catalog_number: product.catalog_number,
        category_id: product.category_id,
        price : product.price,
        sale_price : product.sale_price,
        stock_units : product.stock_units,
      });
    });
  }
 closeDialog(){
  this.dialogRef.close();

 }
 openDeleteConfirmModal(){
  const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
    width: '400px',
    data: {}
  });

  dialogRef.afterClosed().subscribe((result:boolean)=> {
    if(result)
      this.deleteProduct();
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
