import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  data: Product[] = [];
  displayedColumns: string[] = ['status', 'id', 'img', 'name', 'description', 'english_name', 'english_description', 'price', 'sale_price', 'stock_units', 'open'];
  isLoadingResults = true;
  imgUrl=environment.imgUrl;
  constructor(private productsService :ProductsService) { }

  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList(){
    this.productsService.getList()
    .subscribe((res: Product[]) => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
  
  deleteProduct(product : Product){
    this.isLoadingResults = true;
    this.productsService.delete(product)
      .subscribe(res => {
        this.getProductsList();
          //this.isLoadingResults = false;
          
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
