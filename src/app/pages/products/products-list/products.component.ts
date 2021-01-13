import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { environment } from '../../../../environments/environment';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { ViewProductComponent } from '../view-product/view-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { DeleteConfirmDialogComponent } from 'src/app/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  data: Product[] = [];
  displayedColumns: string[] = ['status', 'id', 'img', 'name', 'category', 'description', 'price', 'sale_price', 'stock_units', 'open'];
  isLoadingResults = true;
  noProduct: boolean = false;
  imgUrl = environment.imgUrl;
  categories: Category[];
  filterBy: string[] = ["name", "catalog_number"];
  filterArray: Product[];
  filterCategory;
  filterStatus;
  filterBysearch;
  statusList = [{
    status: "0",
    label: "לא פעיל"
  },
  {
    status: "1",
    label: "פעיל"
  }];

  constructor(private productsService: ProductsService
    , public dialog: MatDialog,
    private categoryService: CategoryService,) {


  }

  ngOnInit(): void {
    this.getProductsList();
    this.getCategories();
  }
  changeStatus(item, event: MatSlideToggleChange) {
    item.status = event.checked ? 1 : 0;
    this.productsService.changeStatus(+item.id, event.checked ? 1 : 0).subscribe(() => {
      console.log('status changed')
    });
  }

  addProduct(): void {
    console.log(this.categories.length > 0);
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '75%',
      minWidth: '650px',
      data: { categories: this.categories, canAddProduct: this.categories.length > 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getProductsList()
    });
  }
  onChangeSearch(event) {
    this.filterArray = event;
    this.filterBysearch = event;
    this.filter();
  }
  editProduct(id: number): void {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: '75%',
      minWidth: '650px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getProductsList()
    });
  }


  viewProduct(id: number): void {
    const dialogRef = this.dialog.open(ViewProductComponent, {
      width: '75%',
      minWidth: '650px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getProductsList()
      //add coupon
    });
  }
  getProductsList() {
    this.productsService.getList()
      .subscribe((res: Product[]) => {
        console.log(res);
        this.data = res.sort((a, b) => {
          if (a.status < b.status)
            return 1

          if (b.status < a.status)
            return -1;
          if (+a.id > +b.id)
            return 1
          return -1;
        });
        console.log(this.data);
        this.filterArray = this.data;
        this.filterBysearch = this.data;
        this.isLoadingResults = false;
        if (this.data.length == 0) {
          console.log("aaa");
          this.noProduct = true;
          console.log(this.noProduct);
        }
        else {
          this.noProduct = false;
        }
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
  openDeleteConfirmModal(product: Product) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      data: { canDeleted: true }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result)
        this.deleteProduct(product);
    });
  }
  deleteProduct(product: Product) {
    this.isLoadingResults = true;
    this.productsService.delete(product.id)
      .subscribe(res => {
        this.getProductsList();
        //this.isLoadingResults = false;

      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
      );
  }
  getCategories() {
    this.categoryService.getList()
      .subscribe((res: Category[]) => {
        this.categories = res;
      }, err => {
        console.error(err);
      });
  }
  filter() {
    this.filterArray = this.filterBysearch.filter((item) => !this.filterCategory || (item.category_id == this.filterCategory))
    this.filterArray = this._filter(this.filterCategory, this.filterBysearch, "category_id");
    this.filterArray = this._filter(this.filterStatus, this.filterArray, "status");
  }
  _filter(value: any, array: any[], key) {
    let filterArray = array;
    if (value) {
      filterArray = array.filter(item => value == item[key]);
    }
    return filterArray
  }
}
